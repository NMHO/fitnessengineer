var mongoose = require( 'mongoose' );
var gracefulShutdown;

//var dbURI = 'mongodb://localhost/FitnessDB';
var dbURI = 'mongodb://fitnesswebappdb:fitnesswebappdb@ds013545.mlab.com:13545/heroku_rhnsjtgw'

mongoose.connect(dbURI);

// Monitoring for successful connection through Mongoose
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

// Checking for connection error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

// Checking for disconnection event
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

// Close Mongoose connection, passing through an anonymous function to run when closed
// Define function to accept message and callback function

gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
    // Output message and call callback when Mongoose connection is closed
  });
};
// Listen for SIGUSR2, which is what nodemon uses
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
      // Send message to graceful- Shutdown and callback to kill process, emitting SIGUSR2 again
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Listen for SIGINT emitted on application termination
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
      //Send message to gracefulShutdown and callback to exit Node process
    process.exit(0);
  });
});

// Listen for SIGTERM emitted when Heroku shuts down process
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function () {
      //Send message to gracefulShutdown and callback to exit Node process
    process.exit(0);
  });
});