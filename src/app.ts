import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import { Server } from 'socket.io';
import prisma from './database/prisma';

dotenv.config();

const port = process.env.PORT || 9000;
const app = express();
const server = createServer(app);
export const io = new Server(server);

app
  .use(
    cors({
      origin: '*',
    })
  )
  .use(express.json())
  .use(morgan('dev'));

app
  .use('/public', express.static('assets'))
  .use(favicon('./assets/images/favicon.ico'));

app.get('/', (req, res) => {
  res.send('it works. Done by BrightkyEfoo');
});
// Do your logic here

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);

  const user = await prisma.user.create({data : {email : 'bright', name : 'hello', phone : 'sks,x'}})

  console.log('user', user)
});
