import Server from "./classes/server";
import router from "./routes/router";
import bodyParser from 'body-parser'
import cors from 'cors';

// Instancia del servidor
const server = Server.instance;

// Configuración del body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
// server.app.use(bodyParser.json);

// Configuración de cors
server.app.use(cors({
    origin: true,
    credentials: true
}))
// Configuración de rutas
server.app.use('/', router);

// Iniciación del servidor
server.start(() => console.log(`El servidor esta corriendo sobre el puerto: ${server.port}`));