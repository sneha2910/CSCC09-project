// require('dotenv').config();
 require('dotenv').config({ path: "./.env" });
const express = require('express');
const createError = require('http-errors');
const userRoutes = require('./routes/users.js');
const projectRoutes = require('./routes/projects.js');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require("cors");
// const port = process.env.PORT || 3001;
const bindWebsocket = require('./websockets/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(require("./routes/users"));
// // get driver connection
// const dbo = require("./db/conn");

// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
//   console.log(`Server is running on port: ${port}`);
// });


const sessionParser = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});
app.use(sessionParser);

app.use((req, res, next) => {
  req.username = req.session.username;
  console.log(req.path, req.method, req.username);
   next();
});

//routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //listening for events
    const server = app.listen(process.env.PORT, () => {
      console.log('Connected to db and started on port ' + process.env.PORT + '...');
    });

    bindWebsocket(server, sessionParser);

  })
  .catch((err) => {
    console.log(err);
  });