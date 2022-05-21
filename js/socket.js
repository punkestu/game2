class Socket {
  constructor(url = "") {
//     this.socket = new WebSocket(url);
  }
  onerror() {}
  onmessage() {}
  onopen() {}
  onclose() {}
  listen() {
//     this.socket.addEventListener("open", this.onopen);
//     this.socket.addEventListener("close", this.onclose);
//     this.socket.addEventListener("message", this.onmessage);
//     this.socket.addEventListener("error", this.onerror);
  }
}

export { Socket };
