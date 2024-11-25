const Comment = require("../hooks/Comment");

const commentController = {
  create: async (req, res) => {
    const { text } = req.body
    await Comment.create({ text })
    return res.status(201).json({ msg: "Comentário criado com sucesso!" })
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
