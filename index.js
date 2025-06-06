require("express-async-errors")
const express = require("express")
const cors = require("cors");
const app = express()
const connection = require("./src/database/connection")
const router = require("./routes/router");
const { seedAdmin } = require("./src/services/seeds");
const PORT = process.env.PORT || 3000


const startServer = async () => {
    try {
        await connection.authenticate();
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        app.use(cors());
        app.all("*", router);

        // await connection.dropAllSchemas();
        await connection.sync({ force: false });

        await seedAdmin()

        app.listen(PORT, () => { console.log(`\nServidor rodando na porta ${PORT}`) });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
};

startServer();
