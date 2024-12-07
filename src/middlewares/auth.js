// middleware that deals with the JWT authentication

const ApiError = require("../classes/api-errors");
// importing the jwt library, that is a library that deals with token authentication for web services
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("Token não enviado!")
        throw new ApiError("Usuário não autenticado", 401)
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Erro na verificação do token: " + err)
            throw new ApiError("Token inválido", 401)
        }
        req.user = decoded;
        next();
    });
};

module.exports = { authenticateToken };