const User = require("../models/User")
const Book = require("../models/Book")
const Comment = require("../models/Comment")

Comment.belongsToMany(User, { through: "UserComment" })
Comment.belongsToMany(Book, { through: "BookComment" })

module.exports = Comment;
