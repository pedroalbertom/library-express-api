const Armario = require("../models/Locker");

const armarioController = {
  create: async (req, res) => {
    let { name, description, patrimonyNumber } = req.body
    await Armario.create({ name: name, description: description, patrimonyNumber: patrimonyNumber })
    return res.status(201).json({ msg: "Armario criado com sucesso!" })
  },

  list: async (req, res) => {
    let lockerList = await Armario.findAll()
    return res.json(lockerList)
  },

  update: async (req, res) => {
    let id = parseInt(req.params.id)
    let locker = await Armario.findByPk(id)
    let { name, description, patrimonyNumber } = req.body
    await locker.update({ name: name, description: description, patrimonyNumber: patrimonyNumber })
    return res.status(200).json({ msg: "Armário atualizado com sucesso!" })
  },

  delete: async (req, res) => {
    let id = parseInt(req.params.id)
    await Armario.destroy({ where: { id: id } })
    return res.status(200).json({ msg: "Armário deletado com sucesso!" })
  }
};

module.exports = armarioController;
