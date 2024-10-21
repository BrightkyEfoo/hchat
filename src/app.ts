import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import { Server } from 'socket.io';
import { authRouter } from './routes/authRoutes';
import SocketService from './services/socketService';


dotenv.config();

const port = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);
export const io = new Server(server);
export const socketService = new SocketService(io)

app
.use(
    cors({
      origin: '*',
    })
)
.use(express.json())
.use(morgan('dev'));

app.use('/public', express.static('assets')).use(favicon('./assets/images/favicon.ico'));

const version = 'v1';
const appName = 'api';
const context = `/${appName}/${version}`;
app.use(`${context}/auth`, authRouter);


app.get('/', (req, res) => {
  res.send('it works. Done by BrightkyEfoo');
});
// Do your logic here


server.listen(port, async () => {
  console.log(`Server listening on port ${port}`);

});
