var mysql = require('mysql');
var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


/// this is pre-Sequelize Code
// exports.connection = mysql.createConnection({
//   user: "root",
//   password: "",
//   database: "chat"
// });

// exports.connection.connect();


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
Message.sync();


exports.Message = Message;
exports.Room = Room;
exports.User = User;

