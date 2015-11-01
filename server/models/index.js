var db = require('../db');
var Promise = require('bluebird');
// db.connections.connect()  this is done automatically


module.exports = {
  messages: {
    get: function () {
      return new Promise(function(resolve, reject) {
        db.Message.sync().then(function() {
          db.Message.findAll().then(function(data) {
            return resolve(data);
          });
         // db.connection.query('SELECT * FROM messages', function(err, data) {
           // return (err ? reject(err) : resolve(data));
         // });
        });
       });
    }, 

    post: function (data) {
      
      console.log('model data: ' + data);
    
      db.User.sync().then(function() {
        var newUser = db.User.build({username: data.user});
        newUser.save().then(function() {
          db.Message.sync().then(function(){
            var newMessage = db.Message.build({body: data.body});
            newMessage.save().then(function(){
              console.log("Message Saved in DB");
            });
          });
        });
      });
    }
  },


     
      // var findRoomId = 'SELECT room_id FROM rooms WHERE name = data.roomname'
     
     // pre-Sequelize: 
      // var querystring = 'INSERT INTO messages (body, user, createdAt, room_id) VALUES ( "' + data.body + '", "' + data.user +'", UNIX_TIMESTAMP(NOW()), 1)';
  
      // db.connection.query(querystring);


  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

