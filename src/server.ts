import express from 'express';
import mustache from 'mustache-express';
import path from 'path';
import mainRoutes from './routes/index';

const server = express();

server.set('view engine','mustache');
server.set('views',path.join(__dirname,'views'));
server.engine('mustache',mustache());

server.use(express.static(path.join(__dirname,'../public')))
server.use(mainRoutes)
server.listen(3000)

