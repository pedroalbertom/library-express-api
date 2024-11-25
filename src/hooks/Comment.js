const User = require("../models/User")
const Book = require("../models/Book")
const Comment = require("../models/Comment")

Comment.belongsTo(Book, { foreignKey: 'bookId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = Comment;
