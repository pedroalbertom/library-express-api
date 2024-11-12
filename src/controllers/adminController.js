const Admin = require("../models/Admin");

const adminController = {
  create: async (req, res) => {
    let { name, registration, password } = req.body
    await Admin.create({ name: name, registration: registration, password: password })
    return res.status(201).json({ msg: "Admin criado com sucesso!" })
  },

  list: async (req, res) => {
    let adminList = await Admin.findAll()
    return res.json(adminList)
  },

  update: async (req, res) => {
    let id = parseInt(req.params.id)
    let admin = await Admin.findByPk(id)
    let { name, registration, password } = req.body
    await admin.update({ name: name, registration: registration, password: password })
    return res.status(200).json({ msg: "Admin atualizado com sucesso!" })
  },

  delete: async (req, res) => {
    let id = parseInt(req.params.id)
    await Admin.destroy({ where: { id: id } })
    return res.status(200).json({ msg: "Admin deletado com sucesso!" })
  }
};

module.exports = adminController;
