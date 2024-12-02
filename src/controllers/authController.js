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

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findOne({ where: { id: decoded.id } });
        if (!user) throw new ApiError("Usuário não existe!", 403);

        res.json({ msg: "Usuário deslogado com sucesso!" });
    },

    register: async (req, res) => {
        const newUser = req.body;

        if (!req.user.isAdmin) throw new ApiError('Somente administradores podem criar um novo usuário', 403);

        const user = await User.create(newUser);
        res.status(201).json(sanitizeUserData(user.toJSON()));
    },

    forgotPass: async (req, res) => {
        const { email } = req.body;
        if (!email) throw new ApiError("Informe o email", 422);

        const user = await User.findOne({ where: { email } });
        if (!user) throw new ApiError("Email não encontrado", 401);

        const code = generateCode(4);
        const recovery_token = jwt.sign({}, code, { expiresIn: "20m" });
        user.set({ recovery_token });
        await user.save();

        const getMailBody = require("../utils/mailBody");
        const buffer = Buffer.from(getMailBody(user.name, code), ["text/html"]);

        mailer.transporter.sendMail({
            from: mailer.address,
            to: user.email,
            subject: "Recuperação de senha",
            html: `${buffer}`,
        });

        res.json({ msg: "Email enviado com sucesso" });
    },

    resetPass: async (req, res) => {
        const { email, code, password } = req.body;
        if (!email) throw new ApiError("Informe o email", 422);

        const user = await User.findOne({ where: { email } });
        if (!user) throw new ApiError("Usuário não encontrado", 404);

        try {
            jwt.verify(user.recovery_token, code.toLocaleUpperCase());
        } catch {
            throw new ApiError("Código inválido ou expirado", 403);
        }

        if (!password) return res.json({ msg: "Código válido" });

        user.set({ password: await bcrypt.hash(password, 10), recovery_token: null });
        await user.save();

        res.json({ msg: "Senha alterada com sucesso" });
    }
};

function generateCode(digits) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < digits; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
}

function sanitizeUserData(userData) {
    delete userData.password;
    delete userData.recoveryToken;
    return userData;
}

module.exports = authController;
