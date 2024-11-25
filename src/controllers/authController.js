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
        const groups = await user.getGroups();
        const comparison = await bcrypt.compare(password, user.password);
        if (!comparison) throw new ApiError("Credenciais incorretas", 401);

        const payload = { id: user.id, isSuperAdmin: user.isSuperAdmin, isAdmin: user.isAdmin };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '12h' });
        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            id: user.id,
            name: user.name,
            registration: user.registration,
            email: user.email,
            area: user.area,
            isAdmin: user.isAdmin,
            Groups: groups,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    },

    token: async (req, res) => {
        const { token } = req.body;
        if (!token) throw new ApiError("Token não enviado!", 401);
        const user = await User.findOne({ where: { refreshToken: token } });
        if (!user) throw new ApiError("Usuário não autenticado!", 401);

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, userPayload) => {
            if (err) throw new ApiError("Token inválido!", 401);
            const accessToken = jwt.sign(
                { id: userPayload.id, isSuperAdmin: userPayload.isSuperAdmin, isAdmin: userPayload.isAdmin },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            res.json({ accessToken });
        });
    },

    logout: async (req, res) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) throw new ApiError("Usuário não autenticado", 401);

        const user = await User.findOne({ where: { id: jwt.decode(token).id } });
        if (!user) throw new ApiError("Usuário não existe!", 403);
        await user.update({ refreshToken: null });

        res.json({ msg: "Usuário deslogado com sucesso!" });
    },

    register: async (req, res) => {
        const newUser = req.body;
        const groupIds = req.body.Groups;

        if (!req.user.isSuperAdmin && !req.user.isAdmin) throw new ApiError('Somente administradores podem criar um novo usuário', 403);
        if (req.user.isAdmin && !groupIds) throw new ApiError('Não é permitido criar um novo usuário sem um grupo', 400);

        const groups = await Group.findAll({ where: { id: groupIds } });
        const user = await User.create(newUser);

        if (groups.length !== groupIds.length) {
            return res.status(400).json({ message: 'Alguns grupos não foram encontrados.' });
        }

        await Promise.all(groups.map(async (group) => {
            await group.addUser(user);
        }));

        res.status(201).json(sanitizeUserData(user.toJSON()));
    },

    forgotPass: async (req, res) => {
        const { email } = req.body;
        if (!email) throw new ApiError("Informe o email", 422);
        const user = await User.findOne({ where: { email } });
        if (!user) throw new ApiError("Email enviado com sucesso", 401);

        const code = generateCode(4);
        const recovery_token = jwt.sign({}, code, { expiresIn: "20m" });
        user.set({ recovery_token });
        user.save();

        const getMailBody = require("../utils/mailBody");
        const buffer = Buffer.from(getMailBody(user.name, code), ["text/html"]);

        mailer.transporter
            .sendMail({
                from: mailer.address,
                to: user.dataValues.email,
                subject: "Unifor Mídia - Recuperação de senha",
                html: `${buffer}`,
            })
            .then(() => console.log("Email enviado!"));

        res.json({ msg: "Email enviado com sucesso" });
    },

    resetPass: async function (req, res) {
        const { email, code, password } = req.body;
        if (!email) throw new ApiError("Informe o email", 422);
        const user = await User.findOne({ where: { email } });

        try {
            jwt.verify(user.recovery_token, code.toLocaleUpperCase());
        } catch {
            throw new ApiError("Código inválido ou expirado", 403);
        }

        if (!password) res.json({ msg: "Código válido" });

        user.set({ password, recovery_token: null });
        await user.save();
        res.json({ msg: "Senha alterada" });
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
    delete userData.isSuperAdmin;
    delete userData.isAdmin;

    return userData;
}

module.exports = authController;
