import http from 'http';
import app from './app';
import mongoose from 'mongoose';

const port: number = Number(process.env['PORT']) || 3000;

const server = http.createServer(app);

mongoose
  .connect(process.env?.['URI'] ?? '')
  .then(() => console.log('Connected to DB'))
  .catch((e) => console.error(e));

const address = server.address();

const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind =
    typeof address === 'string' ? 'pipe: ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.log(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      break;
  }
};

server.on('error', onError);
server.listen(port);
