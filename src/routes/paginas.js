const express = require("express")
const router = express.Router()
const data = require('../models/Flor')
const Usuario = require("../models/database/index")

router.get('/',(req,res)=>{
    var css = "pagina_login.css"
    res.render("pagina_login",{
        css
    })
})

router.get('/pagina_carrinho',(req,res)=>{
    var css = "pagina_home.css"
    res.render("pagina_carrinho",{
        css
    })
})

router.get('/pagina_cadastro',(req,res)=>{
    var css = "pagina_cadastro.css"
    res.render("pagina_cadastro",{
        css
    })
})

router.post('/procurar',(req,res)=>{
    var css = "pagina_home.css"
    const flor = req.body.flor
    var vetorflor = []
    for(var m = 0;m<data.length;m++){
        if(data[m].name.includes(flor)){
            vetorflor.push(data[m])
        }
    }
    res.render("pagina_pesquisaflor",{
        vetorflor,
        css
    })
})

router.post('/cadastroadd',(req,res)=>{
    var email = req.body.email
    res.render("pagina_home")
    
})


router.post('/pagina_home',(req,res)=>{
    var css = "pagina_home.css"
    var email = req.params.email
    var senha = req.params.senha
    res.render('pagina_home',{
        css,
        data:data
    })
})



router.get('/pagina_config',(req,res)=>{
    var css = "pagina_config.css"
    res.render("pagina_config",{
        css
    })
})

router.get('/pagina_flor_:nome',(req,res)=>{
    var css = "pagina_flor.css"
    var nome = req.params.nome
    for(var x = 0;x<data.length;x++){
        if (data[x].name == nome){
            var type = data[x].type
            var price = data[x].price
            var image = data[x].image
        }
    }

    res.render("pagina_flor",{
        css,
        nome,
        type,
        price,
        image
    })
})


module.exports = router