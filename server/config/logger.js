const fs = require('fs')

module.exports = (app) => {
  // Create a logger, the easy way
  app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
      if(err) {
        console.log('Unable to append to server.log.');
      }
    });  
    
    next();
  });
}