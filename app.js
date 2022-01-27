const express = require("express")
const handlebars = require("express-handlebars")
const bodyprser = require("body-parser")
const mongoose = require("mongoose")
const app = express()
const paginas = require("./routes/paginas")
const path = require('path')
const connectDB = require('./models/database')
// const sequelize = require('./models/database/index')



app.use(bodyprser.urlencoded({extended:true})) 
app.use(bodyprser.json())

app.engine('handlebars',handlebars.engine({defaultLayout:'main'}))
app.set('view engine','handlebars')

connectDB()

app.use(express.static(path.join(__dirname,"public")))

app.use(paginas)

const PORT = 9091
app.listen(PORT,()=>{
    console.log("Servidor rodandos")
})
 
