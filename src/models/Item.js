const Sequelize = require("sequelize")
const connection = require("../database/connection")
const Category = require("./ItemType")
const Status = require("./Status")
const Locker = require("./Locker")
const ItemType = require("./ItemType")

const Item = connection.define("Item", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    seriesNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    patrimonyNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true
    },
    RFIDTag: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

Item.belongsTo(Locker, {
    foreignKey: {
        allowNull: false
    }
});
Item.belongsTo(ItemType, {
    foreignKey: {
        allowNull: false
    }
});
Item.belongsTo(Status, {
    foreignKey: {
        allowNull: false
    }
});


Item.sync({force: false}).then(() => {console.log("Tabela Item criada!")})

module.exports = Item
