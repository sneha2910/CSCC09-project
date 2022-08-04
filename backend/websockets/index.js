const socketio = require("socket.io");
const Projects = require("../models/projectModel");

const toSocketMiddleware = (middleware) => (socket, next) => {
  middleware(socket.request, {}, next);
};

const joinRoom = (socket, projectId, frameId) => {
  console.log(`${projectId}/${frameId}`);
  socket.join(`${projectId}/${frameId}`);
};
const leaveRoom = (socket) => {
  socket.leaveAll();
};

module.exports = (server, sessionParser) => {
  const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  /* Store user selection in memory here */
  const userSelection = new Map();

  io.use(toSocketMiddleware(sessionParser));
  /* Only allow authenticated users to join the socket */
  io.use((socket, next) => {
    const session = socket.request.session;
    if (session && session.username) {
      next();
    } else {
      next(new Error("Log in required"));
    }
  });

  //socket connection for user
  io.on("connection", (socket) => {
    console.log(`User ${socket.request.session.username} connected`);
    socket.on("joinRoom", (data) => {
      const { projectId, frameId } = data;
      joinRoom(socket, projectId, frameId);
      const currentFrameSelection =
        userSelection.get(`${projectId}/${frameId}`) ?? new Map();
      console.log(currentFrameSelection);
      Array.from(currentFrameSelection.entries()).forEach(
        ([username, selection]) => {
          socket.emit("updateSelection", {
            username,
            selection,
          });
        }
      );
    });
    socket.on("leaveRoom", () => {
      leaveRoom(socket);
    });

    const updateSelection = (data) => {
      const { projectId, frameId, elementIds } = data;
      const username = socket.request.session.username;
      const frameSelection =
        userSelection.get(`${projectId}/${frameId}`) ?? new Map();
      frameSelection.set(username, new Set(elementIds));

      socket.to(`${projectId}/${frameId}`).emit("updateSelection", {
        username,
        elementIds,
      });
    };
    socket.on("updateSelection", updateSelection);

    const updateElements = (data) => {
      const { elements, projectId, frameId } = data;
      Projects.findOne({ _id: projectId })
        .then((project) => {
          console.log(project.frames);
          const frame = project.frames.find((frame) => frame._id == frameId);
          if (!frame) {
            return Promise.reject("Frame not found");
          }

          elements.forEach((elm) => {
            const existingElement = frame.elements.find(
              (element) => elm.id === element.content.id
            );
            if (existingElement) {
              existingElement.content = elm;
            } else {
              frame.elements.push({ content: elm });
            }
          });
          return project.save().then(() => {
            console.log("Elements updated", socket.rooms);
            return socket.broadcast
              .to(`${projectId}/${frameId}`)
              .emit("updateElements", { elements });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    socket.on("updateElements", updateElements);

    const deleteElements = (data) => {
      const { elementIds, projectId, frameId } = data;
      Projects.findOne({ _id: projectId })
        .then((project) => {
          let frame = project.frames.find((frame) => frame._id == frameId);
          if (!frame) {
            return Promise.reject("Frame not found");
          }

          const elementsToBeDeleted = [...elementIds];
          const recursiveAddChildren = (elementId) => {
            if (elementsToBeDeleted.includes(elementId)) {
              return;
            }
            const element = frame.elements.find((element) =>
              element.content.children?.includes(elementId)
            );
            if (element) {
              elementsToBeDeleted.push(element.content.id);
              recursiveAddChildren(element.content.id);
            }
          };
          elementIds.forEach((elementId) => {
            recursiveAddChildren(elementId);
          });

          frame.elements = frame.elements.filter(
            (element) => !elementsToBeDeleted.includes(element.content.id)
          );
          console.log("Delete elements:", elementsToBeDeleted);
          return project.save().then(() => {
            return socket.broadcast
              .to(`${projectId}/${frameId}`)
              .emit("deleteElements", { elementIds: elementsToBeDeleted });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    socket.on("deleteElements", deleteElements);

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
  });

  return server;
};
