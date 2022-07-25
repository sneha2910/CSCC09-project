const ws = require("ws");

module.exports = (server, sessionParser) => {
  const wsServer = new ws.Server({
    noServer: true,
    path: "/api/ws",
  });

  server.on("upgrade", (request, socket, head) => {
    sessionParser(request, {}, () => {
      if (request.session.username) {
        wsServer.handleUpgrade(request, socket, head, (ws) => {
          wsServer.emit("connection", ws, request);
        });
      } else {
        socket.destroy();
      }
    });
  });

  wsServer.on("connection", (conn, request) => {
    console.log("websocket connected");
    if (!request.session.username) {
      conn.send(
        JSON.stringify({
          type: "error",
          message: "access denied",
        })
      );
      conn.close();
      console.log("websocket closed");
      return;
    }
    conn.username = request.session.username;
    conn.isOnline = true;
    conn.send(
      JSON.stringify({
        type: "user-connected",
        username: conn.username,
      })
    );
    conn.on("message", (message) => {
      try {
        const data = JSON.parse(message);
        console.log('data received: ', data);
      } catch (err) {
        conn.close();
      }
    });
  });

  return wsServer;
};
