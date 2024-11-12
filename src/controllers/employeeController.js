const Employee = require("../models/Employee");

const employeeController = {
  create: async (req, res) => {
    let { name, registration } = req.body
    await Employee.create({ name: name, registration: registration })
    return res.status(201).json({ msg: "Colaborador criado com sucesso!" })
  },

  list: async (req, res) => {
    let employeeList = await Employee.findAll()
    return res.json(employeeList)
  },

  update: async (req, res) => {
    let id = parseInt(req.params.id)
    let employee = await Employee.findByPk(id)
    let { name, registration } = req.body
    await employee.update({ name: name, registration: registration })
    return res.status(200).json({ msg: "Colaborador atualizado com sucesso!" })
  },

  delete: async (req, res) => {
    let id = parseInt(req.params.id)
    await Employee.destroy({ where: { id: id } })
    return res.status(200).json({ msg: "Colaborador deletado com sucesso!" })
  }
};

module.exports = employeeController;
