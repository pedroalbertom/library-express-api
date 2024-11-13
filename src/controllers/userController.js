const User = require("../models/User");

const userController = {
  create: async (req, res) => {
    let { name, registration, password, email, isAdmin } = req.body
    await User.create({ name, registration, password, email, isAdmin })
    return res.status(201).json({ msg: "Usuário criado com sucesso!" })
  },

  list: async (req, res) => {
    let userList = await User.findAll()
    return res.json(userList)
  },

  update: async (req, res) => {
    let id = parseInt(req.params.id)
    let user = await User.findByPk(id)
    let { name, registration, password, email, isAdmin } = req.body
    await user.update({ name, registration, password, email, isAdmin })
    return res.status(200).json({ msg: "Usuário atualizado com sucesso!" })
  },

  delete: async (req, res) => {
    let id = parseInt(req.params.id)
    await User.destroy({ where: { id: id } })
    return res.status(200).json({ msg: "Usuário deletado com sucesso!" })
  }
};

module.exports = userController;
