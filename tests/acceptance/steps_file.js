
'use strict';
// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    getConsole(){
      return this.grabBrowserLogs()
        .then(logs => logs
          .filter(log => log.source == 'console-api')
          .map(log => /"(.+)"$/.exec(log.message))
          .map(msg => msg ? msg[1] : null)
        );
    }
  });
};
