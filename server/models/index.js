var db = require('../db');
var Promise = require('bluebird');
// db.connections.connect()  this is done automatically


module.exports = {
  messages: {
    get: function () {
      return new Promise(function(resolve, reject) {
         db.connection.query('SELECT * FROM messages', function(err, data) {
           return (err ? reject(err) : resolve(data));
         });
       });
    }, 

    post: function (data) {
      console.log('model data: ' + data);

      // var findRoomId = 'SELECT room_id FROM rooms WHERE name = data.roomname'
      var querystring = 'INSERT INTO messages (body, user, createdAt, room_id) VALUES ( "' + data.body + '", "' + data.user +'", UNIX_TIMESTAMP(NOW()), 1)';
      // console.log(querystring);
      db.connection.query(querystring);
 
    }
  },


  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

