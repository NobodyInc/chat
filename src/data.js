import io from "socket.io-client";

const socket = io('http://0.0.0.0:3700');

export let user = null;

export function sendMessage(userId, message) {
  socket.emit('send', {who: userId, message});
}

export function listen(channel, fn) {
  socket.on(channel, fn);
}


