const axios = require('axios');
const ApiError = require('../classes/api-errors');

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = 'AIzaSyCme4j2MQHZ30o6RYswGYdBmX_-3Z-vbt4';

async function buscarLivroPorISBN(isbn) {
    try {
        const response = await axios.get(GOOGLE_BOOKS_API, {
            params: {
                q: `isbn:${isbn}`, // Consulta pelo ISBN
                key: API_KEY,
            },
        });

        const data = response.data;

        // Verifica se encontrou resultados
        if (data.totalItems === 0) throw new ApiError('Nenhum livro encontrado para o ISBN fornecido.', 400);

        // Pega o primeiro livro da lista
        const livro = data.items[0].volumeInfo;

        // Retorna os dados do livro
        return {
            title: livro.title,
            author: livro.authors?.[0] || 'Autor desconhecido', // Primeiro autor ou mensagem padrão
            description: livro.description || 'Descrição indisponível.',
            publication: livro.publishedDate || 'Data de publicação desconhecida.',
            category: livro.categories?.[0] || 'Categoria não informada', // Primeira categoria ou mensagem padrão
            image: livro.imageLinks?.thumbnail || 'Capa indisponível.',
        };
    } catch (error) {
        console.error('Erro ao buscar livro:', error);
        throw new ApiError('Erro ao buscar livro', 400);
    }
}

module.exports = { buscarLivroPorISBN };
