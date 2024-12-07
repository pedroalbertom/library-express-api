const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require('../classes/api-errors');
const mailer = require("../services/mailer");
const bcrypt = require("bcrypt");

const authController = {
    login: async (req, res) => {
        const { registration, password } = req.body;
        const user = await User.findOne({ where: { registration } });
        if (!user) throw new ApiError("Credenciais incorretas", 401);

        const comparison = await bcrypt.compare(password, user.password);
        if (!comparison) throw new ApiError("Credenciais incorretas", 401);

        const payload = { registration: user.registration, id: user.id, isAdmin: user.isAdmin };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

        res.json({
            id: user.id,
            name: user.name,
            registration: user.registration,
            email: user.email,
            isAdmin: user.isAdmin,
            token
        });
    },

    logout: async (req, res) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) throw new ApiError("Usuário não autenticado", 401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id: decoded.id } });
        if (!user) throw new ApiError("Usuário não existe!", 403);

        //logica de deslogar o user
        //blacklist token?

        res.json({ msg: "Usuário deslogado com sucesso!" });
    },

    register: async (req, res) => {
        const newUser = req.body;

        const user = await User.create(newUser);
        res.status(201).json(sanitizeUserData(user.toJSON()));
    }
};

function sanitizeUserData(userData) {
    delete userData.password;
    delete userData.recoveryToken;
    return userData;
}

module.exports = authController;
