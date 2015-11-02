var mysql = require('mysql');
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");

var User = sequelize.define('User', {
  username: Sequelize.STRING
});

var Room = sequelize.define('Room', {
  name: Sequelize.STRING
});

var Message = sequelize.define('Message', {
  body: Sequelize.STRING
});

Room.hasMany(Message);
User.hasMany(Message);
Message.belongsTo(Room);
Message.belongsTo(User);

User.sync();
Room.sync();
Message.sync().then(function() {
  var newUser = User.findOrCreate({where: {username: 'Test User'}}).spread(function(user) {
    var newRoom = Room.findOrCreate({where: {name: 'Test Room'}}).spread(function(room) {
      var newMessage = Message.build({body: 'Test Message'});
      newMessage.save().then(function() {
        newMessage.setRoom(room);
        newMessage.setUser(user);
        console.log(newMessage.get({plain: true}));
        var newMessageTwo = Message.build({body: 'Test Message Two'});
        newMessageTwo.save().then(function(msg) {
          msg.setRoom(room);
          msg.setUser(user);
          console.log(newMessageTwo.get({plan: true}));
        });
      });
    });
  });
});
