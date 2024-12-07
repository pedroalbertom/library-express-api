const User = require("../hooks/User");

const userController = {
  list: async (req, res) => {
    let userList = await User.findAll()
    return res.json(userList)
  },

  listOne: async (req, res) => {
    let user = await User.findByPk(req.params.id)
    return res.json(user)
  },

  update: async (req, res) => {
    let id = parseInt(req.params.id)
    let user = await User.findByPk(id)
    let body = req.body
    await user.update(body)
    return res.status(200).json({ msg: "Usuário atualizado com sucesso!" })
  },

  delete: async (req, res) => {
    let id = parseInt(req.params.id)
    await User.destroy({ where: { id: id } })
    return res.status(200).json({ msg: "Usuário deletado com sucesso!" })
  }
};

module.exports = userController;
