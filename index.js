require('dotenv').config();

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

let messages = [];

io.on('connection', (socket) => {
  socket.emit('allMessage', messages);

  socket.on('message', (username, msg) => {
    messages = [...messages, { username, text: msg }];
    io.emit('message', username, msg);
  });
});

server.listen(process.env.PORT, () =>
  console.log(`app listen, port: ${process.env.PORT}`)
);
