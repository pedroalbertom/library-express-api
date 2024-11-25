const User = require("../models/User")
const Book = require("../models/Book")
const Comment = require("../models/Comment")
const bcrypt = require("bcrypt")

User.belongsToMany(Book, { through: "UserBook" })
User.hasMany(Comment, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    hooks: true,
})

User.beforeSave(async user => {
    if (user.changed("password")) {
        const pass = user.password;
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(pass, salt)
        user.password = hashed;
    }
})

module.exports = User;
