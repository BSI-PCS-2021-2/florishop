const { response } = require("express")
const express = require("express")
const router = express.Router()
const data = require('../models/Flor')
const User = require('../models/User')
const fetch = require("node-fetch")
const pensador = require('pensador')
const mailer = require('nodemailer')
 
const user= "florishop.loja@gmail.com" 
const pass = 'passeiPCS1!'


router.get('/send',async(req,res)=>{
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    const transporter = mailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        auth:{user,pass},   
        secure:false,
        tls:{
            rejectUnauthorized:false 
        }
    })

    transporter.sendMail({
        from:user,
        to:userP.email,
        replyTo:"florishop.loja@gmail.com",
        subject:"Requisição de senha Florishop",
        text:`A sua senha de acesso Florishop é ${userP.password}`

    }).then(info=>{
        console.log(info)
    }).catch(error=>{
        console.log(error)
    })  

    res.render("pagina_login",{
        css:"pagina_login.css",
        message:"Senha enviada para seu email"
    }) 
})



router.get('/',(req,res)=>{
    var css = "pagina_login.css"
    res.render("pagina_login",{
        css
    })
})

router.get('/pagina_carrinho',async(req,res)=>{
    var css = "pagina_home.css" 
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userP.valePresente 
    var cartao = userP.cartao
    console.log(cartao)
    res.render("pagina_carrinho",{
        css,
        valor,
        cartao
    })
})

router.get('/pagina_cadastro',(req,res)=>{
    var css = "pagina_cadastro.css"
    res.render("pagina_cadastro",{ 
        css
    })
})  

router.post('/procurar',async(req,res)=>{
    var css = "pagina_home.css"
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userP.valePresente 
    const flor = req.body.flor
    var vetorflor = []
    for(var m = 0;m<data.length;m++){
        if(data[m].name.includes(flor)){
            vetorflor.push(data[m])
        }
    }
    res.render("pagina_pesquisaflor",{
        vetorflor,
        css,
        valor
    })
})

router.post('/cadastroadd',async(req,res)=>{
    var email = req.body.email
    var senha = req.body.senha
    var cssc = "pagina_cadastro.css"
    var cssl = "pagina_login.css"
    var cor = "green"

    var mensagem = 'email ja utilizado'

    const user = await User.findOne({email})

    if(!user){
        const newUser = new User({
            password:senha,
            email,
            cartao:""
        })

        await newUser.save()
        res.render("pagina_login",{
            mensagem:"Cadastro feito com sucesso",
            css:cssl,
            cor
        })
    } else {
        res.render("pagina_cadastro",{
            error:true,
            css:cssc
        })
    }

    
    
})


router.post('/pagina_home',async(req,res)=>{ 
    var css = "pagina_home.css"
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userP.valePresente 
    var email = req.body.email
    var senha = req.body.senha
    var mensagem = "Email e/ou senha errados"
    var cor = "red"
    const user = await User.findOne({email})

    if(!user){
        res.render('pagina_login',{
            css:"pagina_login.css",
            cor,
            mensagem
        })
        return
    } else {
        if(user.password == senha){
            res.render('pagina_home',{
                css, 
                data:data,
                valor
            })
        } else {
            res.render('pagina_login',{
                css:"pagina_login.css",
                cor,
                mensagem
            })
        }
        
    }

    
})

router.get('/pagina_home',async(req,res)=>{
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userP.valePresente 
    res.render('pagina_home',{
        css:"pagina_home.css",
        valor,
        data:data
    })
    
})

router.get('/pagina_config',async(req,res)=>{
    var css = "pagina_config.css"
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userP.valePresente 
    res.render("pagina_config",{
        css,
        valor
    })
})

router.get('/pagina_flor_:nome',async(req,res)=>{
    var css = "pagina_flor.css"
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userP.valePresente 
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
        image,valor
    })
})

router.get("/pagina_vale_presente",async(req,res)=>{
    css = "pagina_vale_presente.css"
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userP.valePresente 
    res.render('pagina_vale_presente',{ 
        css,
        valor
    }) 
})

router.post("/addvale",async(req,res)=>{
    const userPa = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userPa.valePresente
    const userP = await User.findByIdAndUpdate({
        _id:"61ef64d56655b2274ed753e6"
    },
    {
        valePresente:50
    },
    { 
        new:true    
    })
    res.render('pagina_vale_presente',{
        message:"Vale adicionado com sucesso",
        css: "pagina_vale_presente.css",
        valor:50
    })  
}) 

router.get("/pagina_pagamento",async(req,res)=>{
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userP.valePresente
    res.render('pagina_pagamento',{
        css:"pagina_pagamento.css",
        valor
    })
})

router.post('/salvarcartao',async(req,res)=>{
    var mensagem = "Cartão cadastrado com sucesso"
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userP.valePresente
    console.log(req.body.cartao)
    const userPa = await User.findByIdAndUpdate({
        _id:"61f2e450973b4c0a4533be50"
    },
    {
        cartao:req.body.cartao
    },
    {
        new:true    
    })

    res.render('pagina_pagamento',{
        mensagem,
        css:"pagina_pagamento.css",
        valor
    })
})

router.get('/pagina_efetuar_pedido',async(req,res)=>{
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userP.valePresente
    const userPa = await User.findByIdAndUpdate({
        _id:"61f2e450973b4c0a4533be50" 
    },
    {
        valePresente:0
    },
    { 
        new:true    
    })
    res.render('pagina_efetuar_pedido',{
        css:"pagina_efetuar_pedido.css",
        valor
    })
})

router.post('/pesqcep',async(req,res)=>{ 
    var cep = req.body.cep   
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userP.valePresente
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const dados = await fetch(url)
    const endereco = await dados.json()
    
    res.render('pagina_config',{
        endereco,
        css:"pagina_config.css",
        valor
    })
})


router.post('/pesqfrase',async(req,res)=>{
    var pessoa =  req.body.pessoa + " "
    var frasefinal = " "
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userP.valePresente  
    var cartao = userP.cartao
    pessoa = pessoa.replace(" ","+")
    const url = `https://pensador-api.vercel.app/?term=${pessoa}&max=5`
    const dados = await fetch(url)
    const frase = await dados.json()
    const num = Math.floor((Math.random() * 5) + 1);
    frasefinal = await frase.frases[num].texto
    res.render('pagina_carrinho',{
        frasefinal,
        css:'pagina_home.css',
        valor,cartao
    })
})


router.get("/pagina_pedidos",async(req,res)=>{
    const userP = await User.findOne({email:"jonathas.soares@uniriotec.br"})
    var valor = userP.valePresente 
    res.render("pagina_pedidos",{
        css:"pagina_pedidos.css",
        valor
    }) 
})

router.post('/verificaEmail',async(req,res)=>{
    var email = req.body.email  
    const url = `http://apilayer.net/api/check?access_key=565d7bdcc5fb9930c4c47d9a68efe22e&email=${email}`
    const dados = await fetch(url)
    const val = await dados.json()
    console.log(val) 
    if(val.format_valid&&val.mx_found){
        res.render("pagina_login",{
            texto:"Cadastro feito com sucesso",
            css:"pagina_login.css",
        })
    } else{
        res.render("pagina_cadastro",{
            css:"pagina_cadastro.css",
            mensagem:"Email inválido"
        })
    }
})

module.exports = router   