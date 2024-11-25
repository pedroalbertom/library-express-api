const User = require("../models/User")
const Book = require("../models/Book")
const Comment = require("../models/Comment")

Book.belongsToMany(User, { through: "UserBook" })
Book.hasMany(Comment, {
    foreignKey: "bookId",
    onDelete: "CASCADE",
    hooks: true,
})

module.exports = Book;