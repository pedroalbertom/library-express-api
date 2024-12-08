const User = require("../hooks/User")
const bcrypt = require("bcrypt");

const seedAdmin = async () => {
    const admin = await User.findOne({ where: { registration: "123" } })
    if (admin) return
    const pass = "123";
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(pass, salt)
    await User.bulkCreate([{
        name: "admin",
        registration: "123",
        email: "admin@hotmail.com",
        password: hashed,
        isAdmin: true
    }], { ignoreDuplicates: true, logging: false }).then(() => {
        return console.log("Admin criado!");
    }).catch((err) => {
        console.error(err);
        return console.log("Erro ao criar Admin");
    })
}

module.exports = {
    seedAdmin
}
