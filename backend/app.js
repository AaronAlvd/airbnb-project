const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');  // Required for serving static files

const { environment } = require('./config');
const isProduction = environment === 'production';
const routes = require('./routes');
const { ValidationError } = require('sequelize');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  app.use(cors());
}

app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.use(routes);

// Serve static frontend files if in production
if (isProduction) {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Serve the index.html file for any route that doesn't match an API route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
  });
}

// Catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Process Sequelize errors
app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);

  if (isProduction) {
    // In production, exclude stack from the response
    res.json({
      message: err.message,
      errors: err.errors,
    });
  } else {
    // In development, include stack in the response
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: err.stack,
    });
  }
});

module.exports = app;


// {
//   "spotId": 00,  Fill in the spotId
//   "userId": 00,  Fill in the userId
//   "startDate": "",  Fill in the startDate in ISO format
//   "endDate": ""  Fill in the endDate in ISO format
// }
