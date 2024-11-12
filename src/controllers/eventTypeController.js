const EventType = require("../models/EventType");

const eventTypeController = {
  create: async (req, res) => {
    const { type } = req.body
    await EventType.create({ type: type })
    return res.status(201).json({ msg: "EventType criada com sucesso!" })
  },

  list: async (req, res) => {
    const typeList = await EventType.findAll()
    return res.json(typeList)
  },

  update: async (req, res) => {
    const id = parseInt(req.params.id)
    const typeInstance = await EventType.findByPk(id)
    const { type } = req.body
    await typeInstance.update({ type: type })
    return res.status(200).json({ msg: "EventType atualizada com sucesso!" })
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id)
    await EventType.destroy({ where: { id: id } })
    return res.status(200).json({ msg: "EventType deletada com sucesso!" })
  },
};

module.exports = eventTypeController;
