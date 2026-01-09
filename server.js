const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('sendmsg', (msg, room, name) => { 
    if (room === '') {
      socket.broadcast.emit('receivemsg', msg, name);
    } else {
      socket.to(room).emit('receivemsg', msg, name); 
    }
    console.log(msg);
  });
  socket.on("joinroom", (room, cb) => {
    socket.join(room);
    cb(`joined: ${room}`)
  });
});

const portArg = process.argv.indexOf('--port');
const port = (portArg !== -1 && process.argv[portArg + 1])
  ? parseInt(process.argv[portArg + 1])
  : (process.env.PORT || 3001);

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
