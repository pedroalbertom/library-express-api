const Status = require("../models/Status");

const statusController = {
  create: async (req, res) => {
    let { status } = req.body
    await Status.create({ status: status })
    return res.status(201).json({ msg: "Situação criada com sucesso!" })
  },

  list: async (req, res) => {
    let statusList = await Status.findAll()
    return res.json(statusList)
  },

  update: async (req, res) => {
    let id = parseInt(req.params.id)
    let statusInstance = await Status.findByPk(id)
    let { status } = req.body
    await statusInstance.update({ status: status })
    return res.status(200).json({ msg: "Situação atualizada com sucesso!" })
  },

  delete: async (req, res) => {
    let id = parseInt(req.params.id)
    await Status.destroy({ where: { id: id } })
    return res.status(200).json({ msg: "Situação deletada com sucesso!" })
  },
};

module.exports = statusController;
