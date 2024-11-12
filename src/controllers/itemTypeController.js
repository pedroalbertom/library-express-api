const ItemType = require("../models/ItemType");

const itemTypeController = {
  create: async (req, res) => {
    const { type } = req.body
    await ItemType.create({ type: type })
    return res.status(201).json({ msg: "ItemType criada com sucesso!" })
  },

  list: async (req, res) => {
    const typeList = await ItemType.findAll()
    return res.json(typeList)
  },

  update: async (req, res) => {
    const id = parseInt(req.params.id)
    const typeInstance = await ItemType.findByPk(id)
    const { type } = req.body
    await typeInstance.update({ type: type })
    return res.status(200).json({ msg: "ItemType atualizada com sucesso!" })
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id)
    await ItemType.destroy({ where: { id: id } })
    return res.status(200).json({ msg: "ItemType deletada com sucesso!" })
  },
};

module.exports = itemTypeController;
