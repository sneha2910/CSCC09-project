require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const userRoutes = require('./routes/users.js');
const projectRoutes = require('./routes/projects.js');
const mongoose = require('mongoose');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    //listening for events
    app.listen(process.env.PORT, () => {
      console.log('Connected to db and started on port ' + process.env.PORT + '...');
    });
  })
  .catch((err) => {
    console.log(err);
  });