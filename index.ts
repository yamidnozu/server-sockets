import Server from "./classes/server";
import router from "./routes/router";
import bodyParser from 'body-parser'
import cors from 'cors';


const server = new Server();
server.app.use(bodyParser.urlencoded({ extended: true }));
// server.app.use(bodyParser.json);
server.app.use('/', router);
server.app.use(cors({
    origin: true,
    credentials: true
}))
server.start(() => console.log(`El servidor esta corriendo sobre el puerto: ${server.port}`));