const Item = require("../models/Item");
const Locker = require("../models/Locker");
const Category = require("../models/ItemType");
const Status = require("../models/Status");

const itemController = {
  create: async (req, res) => {
    const {
      name,
      description,
      seriesNumber,
      patrimonyNumber,
      RFIDTag,
      LockerId,
      ItemTypeId,
      StatusId
    } = req.body

    const body = {
      name: name,
      description: description,
      seriesNumber: seriesNumber,
      patrimonyNumber: patrimonyNumber,
      RFIDTag: RFIDTag,
      LockerId: LockerId,
      ItemTypeId: ItemTypeId,
      StatusId: StatusId
    }
    await Item.create(body)
    return res.status(201).json({ msg: "Item criado com sucesso!" })
  },

  list: async (req, res) => {
    const itemList = await Item.findAll({
      include: [
        {
          model: Locker,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: Category,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: Status,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ],
      attributes: { exclude: ['lockerId', 'categoryId', 'statusId', 'createdAt', 'updatedAt'] }
    })
    return res.json(itemList)
  },

  update: async (req, res) => {
    const id = parseInt(req.params.id)
    const item = await Item.findByPk(id)

    const {
      name,
      description,
      seriesNumber,
      patrimonyNumber,
      RFIDTag,
      LockerId,
      ItemTypeId,
      StatusId
    } = req.body;

    const body = {
      name: name,
      description: description,
      seriesNumber: seriesNumber,
      patrimonyNumber: patrimonyNumber,
      RFIDTag: RFIDTag,
      LockerId: LockerId,
      ItemTypeId: ItemTypeId,
      StatusId: StatusId
    };

    await item.update(body)

    return res.status(200).json({ msg: "Item atualizado com sucesso!" })
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id)
    await Item.destroy({ where: { id: id } })
    return res.status(200).json({ msg: "Item deletado com sucesso!" })
  },
};

module.exports = itemController;
