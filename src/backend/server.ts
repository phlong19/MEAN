import http from 'http';
import app from './app';

const port: number = Number(process.env['PORT']) || 3000;

const server = http.createServer(app);

server.listen(port);
