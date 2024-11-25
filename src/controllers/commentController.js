const Comment = require("../hooks/Comment");
const Book = require("../hooks/Book");

const commentController = {
  create: async (req, res) => {
    const { text, bookId } = req.body;

    const userId = req.user.id;

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ msg: "Livro não encontrado." });

    const comment = await Comment.create({ text, bookId, userId });

    return res.status(201).json({ msg: "Comentário criado com sucesso!", comment });
  },


  list: async (req, res) => {
    const commentList = await Comment.findAll()
    return res.json(commentList)
  },

  update: async (req, res) => {
    const id = parseInt(req.params.id)
    const commentInstance = await Comment.findByPk(id)
    const { comment } = req.body
    await commentInstance.update({ comment })
    return res.status(200).json({ msg: "Comentário atualizado com sucesso!" })
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id)
    await Comment.destroy({ where: { id } })
    return res.status(200).json({ msg: "Comentário deletado com sucesso!" })
  },
};

module.exports = commentController;
