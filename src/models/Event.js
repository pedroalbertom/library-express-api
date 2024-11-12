const Sequelize = require("sequelize")
const connection = require("../database/connection")
const Locker = require("./Locker")
const Item = require("./Item")
const Employee = require("./Employee")
const User = require("./Admin")
const EventType = require("./EventType")

const Event = connection.define("Event", {
    event: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false
    }
})

Event.belongsTo(Locker, {
    foreignKey: {
        allowNull: false
    }
})
Event.belongsTo(Item, {
    foreignKey: {
        allowNull: false
    }
})
Event.belongsTo(Employee, {
    foreignKey: {
        allowNull: false
    }
})
Event.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})
Event.belongsTo(EventType, {
    foreignKey: {
        allowNull: false
    }
})

Event.sync({ force: false }).then(() => { console.log("Tabela Event criada!") })

module.exports = Event