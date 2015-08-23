import io from "socket.io-client";

export default class Messages {
  constructor(url) {
    this.socket = io(url);
  }

  send(userId, message) {
    this.socket.emit('send', {who: userId, message: value});
  }

  listen(fn) {
    this.socket.on('message', fn);
  }
}
