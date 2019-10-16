var mongoose = require('mongoose');
// file: simplest.js var log4js = require('log4js'); var logger =
// log4js.getLogger(); logger.debug("Time:", new Date());
const config = require('../config/config.default');

var isConnectedBefore = false;
const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    autoReconnect: true,
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}

//  mongoose.connect(uri, options, function(error) {     // Check error in
// initial connection. There is no 2nd param to the callback.   });   // Or
// using promises   mongoose.connect(uri, options).then(     () => { /** ready
// to use. The `mongoose.connect()` promise resolves to undefined. */ },     err
// => { /** handle initial connection error */ }   );

var connect = function (callback) {
    mongoose
        .connect(config.dataBase, options, function (error) {
            if(!error){
              callback()
            }
        });
};
// connect();

mongoose
    .connection
    .on('error', function () {
        console.log('Could not connect to MongoDB','请确保启动MongoDB服务');
    });

mongoose
    .connection
    .on('disconnected', function () {
        console.log('Lost MongoDB connection...');
        if (!isConnectedBefore)
            connect();
    });
mongoose
    .connection
    .on('connected', function () {
        isConnectedBefore = true;
        console.log('Connection established to MongoDB');
    });

mongoose
    .connection
    .on('reconnected', function () {
        console.log('Reconnected to MongoDB');
    });

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', function () {
    mongoose
        .connection
        .close(function () {
            console.log('Force to close the MongoDB conection');
            process.exit(0);
        });
});

module.exports = connect;