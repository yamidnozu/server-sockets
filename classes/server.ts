import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { SERVER_PORT } from '../global/environment';

import * as socket from '../sockets/sockets';


export default class Server {

    // Instancia del Server singleton
    public static _instance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpService: http.Server;

    private constructor() { // Privado para evitar la creación de múltiples instancias de server, en su lugar usar <instance>
        this.app = express();
        this.port = SERVER_PORT;
        this.httpService = new http.Server(this.app);
        this.io = socketIO(this.httpService);
        this.escucharSockets();
    }

    // Retorna instancia
    public static get instance() {
        return this._instance || (this._instance = new this())
    }
    private escucharSockets() {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {
            console.log('cliente conectado');
            // Escucha el  login del usuario oara configurarli
            socket.configurarUsuario(cliente, this.io);
            // Escucha los mensajes
            socket.mensaje(cliente, this.io);
            // Escucha el evento de desconexión
            socket.desconectar(cliente);
        });

        this.io.on('connection', cliente => {
            console.log('cliente conectado');
            socket.desconectar(cliente);
        });

    }

    start(callbacks: any) {
        this.httpService.listen(this.port, callbacks)
    }
}  