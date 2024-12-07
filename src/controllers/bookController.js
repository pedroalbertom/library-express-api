const Book = require("../hooks/Book");
const Comment = require("../hooks/Comment");

const bookController = {
  create: async (req, res) => {
    let { title, description, patrimonyNumber, author } = req.body
    await Book.create({ title, description, patrimonyNumber, author })
    return res.status(201).json({ msg: "Livro criado com sucesso!" })
  },

  list: async (req, res) => {
    let bookList = await Book.findAll({include: [{model: Comment}]})
    return res.json(bookList)
  },

  update: async (req, res) => {
    let id = parseInt(req.params.id)
    let book = await Book.findByPk(id)
    let { title, description, patrimonyNumber, author } = req.body
    await book.update({ title, description, patrimonyNumber, author })
    return res.status(200).json({ msg: "Livro atualizado com sucesso!" })
  },

  delete: async (req, res) => {
    let id = parseInt(req.params.id)
    await Book.destroy({ where: { id } })
    return res.status(200).json({ msg: "Livro deletado com sucesso!" })
  }
};

module.exports = bookController;
