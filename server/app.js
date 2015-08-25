import express from 'express';
import * as socketio from 'socket.io';

let app = express();

let io = socketio.listen(app.listen(3700));

//let feed = {
//};

let feed = [];
let users = {};

io.sockets.on('connection', (socket) => {
  socket.emit('message', feed);
  socket.on('send', (data) => {
    feed.push(data);
    io.sockets.emit('message', feed);
  });

  socket.on('status', (data) => {
    users[data.who] = {active: data.active};
    io.sockets.emit('status', users);
  });
});
