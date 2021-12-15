import { Router,Request,Response} from "express";
import bodyParser from "body-parser";
import { BodyParser } from "body-parser";
import { Pet } from "../models/Flor";



const router = Router()

router.get('/log2',(req:Request,res:Response)=>{
    let list = Pet.getAll();
    res.render('pagina_home',{
        list
    });
})

router.use(bodyParser.urlencoded({extended:false}));


router.get('/',(req:Request,res:Response)=>{
    res.render('pagina_login');
});



router.post('/log',(req:Request,res:Response)=>{
    let usuario = req.body.email;
    let senha = req.body.password;
    let fim:String = "Credenciais inválidas";
    let list = Pet.getAll();

    console.log(usuario)

    if(usuario == "leojardim5@gmail.com" && senha == "1234"){
        res.render('pagina_home',{
            list
        });
    } else {
        res.render('pagina_login',{
            fim
        });
    }
});

router.get('/pagina_cadastro',(req:Request,res:Response)=>{
    res.render('pagina_cadastro');
})

router.get('/pagina_config',(req:Request,res:Response)=>{
    res.render('pagina_config');
})







export default router;