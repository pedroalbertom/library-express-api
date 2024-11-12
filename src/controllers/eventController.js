const Employee = require("../models/Employee");
const Event = require("../models/Event");
const Item = require("../models/Item");
const Locker = require("../models/Locker");
const User = require("../models/Admin");
const Admin = require("../models/Admin");
const EventType = require("../models/EventType");

const eventController = {
  create: async (req, res) => {
    const {
      event,
      time,
      LockerId,
      ItemId,
      EmployeeId,
      AdminId,
      EventTypeId
    } = req.body

    const body = {
      event: event,
      time: time,
      LockerId: LockerId,
      ItemId: ItemId,
      EmployeeId: EmployeeId,
      AdminId: AdminId,
      EventTypeId: EventTypeId
    }
    await Event.create(body)
    return res.status(201).json({ msg: "Evento criado com sucesso!" })
  },

  list: async (req, res) => {
    const eventList = await Event.findAll({
      include: [
        {
          model: Locker,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: Item,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: Employee,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: Admin,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: EventType,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ],
      attributes: { exclude: ['LockerId', 'ItemId', 'EmployeeId', 'AdminId', 'EventTypeId', 'createdAt', 'updatedAt'] }
    })

    return res.json(eventList)
  },

  update: async (req, res) => {
    let id = parseInt(req.params.id)
    let eventInstance = await Event.findByPk(id)
    const {
      event,
      time,
      LockerId,
      ItemId,
      EmployeeId,
      AdminId,
      EventTypeId
    } = req.body

    const body = {
      event: event,
      time: time,
      LockerId: LockerId,
      ItemId: ItemId,
      EmployeeId: EmployeeId,
      AdminId: AdminId,
      EventTypeId: EventTypeId
    }
    await eventInstance.update(body)
    return res.status(200).json({ msg: "Evento atualizado com sucesso!" })
  },

  delete: async (req, res) => {
    const id = parseInt(req.params.id)
    await Event.destroy({ where: { id: id } })
    return res.status(200).json({ msg: "Evento deletado com sucesso!" })
  },
};

module.exports = eventController;
