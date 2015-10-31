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
      // db.connection.query('SELECT * FROM messages', function(err, rows){
      //   // console.log(rows);
      //   return rows;
      // });
      
    }, // a function which produces all the messages
    post: function (data) {
      console.log('model data: ' + data);
      // return new Promise(function(resolve, reject){
      //   return resolve('done');
      var querystring = 'INSERT INTO messages (body, user, createdAt, room_id) VALUES ( "' + data.body + '", "' + data.user +'", UNIX_TIMESTAMP(NOW()), 1)';
      console.log(querystring);
      db.connection.query(querystring);
      // INSERT INTO messages (body, user, createdAt, room_id) VALUES ( "test message", " user", UNIX_TIMESTAMP(NOW()), 1)
    }
  },
// INSERT INTO messages (body, user, createdAt, room_id)
// VALUES ('Hello Hack Reator From SQL', 'Student0', UNIX_TIMESTAMP(NOW()), 1);
      //   // db///
      //   // curl -H "Content-Type: application/json" -X POST -d '{"user":"xyz","body":"xyz","roomname":"test"}' http://localhost:3000/classes/messages
      // })// 
     // a function which can be used to insert a message into the database


  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

