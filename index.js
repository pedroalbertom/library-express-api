require("express-async-errors")
const express = require("express")
const app = express()
const connection = require("./src/database/connection")
const router = require("./routes/router")
const errorHandler = require("./src/middlewares/error")
const PORT = process.env.PORT || 3000

// Database
connection.authenticate().then(() => {

    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

    app.all("*", router)

    app.use(errorHandler)

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`)
    })

}).catch((err) => {

    console.log(err)

})
