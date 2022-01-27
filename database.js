const mongoose  = require('mongoose')

const connectDB = () => {
    mongoose.connect("mongodb+srv://leojardim5:Leojardim13@cluster0.rfhoa.mongodb.net/Florishop",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


const db = mongoose.connection

db.on("error",(error)=>{
    console.log(error)
})

db.once("open",()=>{
    console.log("connect to database")
})

}


module.exports = connectDB