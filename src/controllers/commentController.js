const Comment = require("../models/Comment");

const commentController = {
  create: async (req, res) => {
    const { comment } = req.body
    await Comment.create({ comment })
    return res.status(201).json({ msg: "Comentário criada com sucesso!" })
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
    return res.status(200).json({ msg: "Comentário atualizada com sucesso!" })
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id)
    await Comment.destroy({ where: { id } })
    return res.status(200).json({ msg: "Comentário deletada com sucesso!" })
  },
};

module.exports = commentController;
