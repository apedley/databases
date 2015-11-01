/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */

var User = sequelize.define('User', {
  username: Sequelize.STRING
});

var Room = sequelize.define('Room', {
  name: Sequelize.STRING,
});

var Message = sequelize.define('Message', {
  // userid: Sequelize.INTEGER,
  body: Sequelize.STRING,
  roomname: Sequelize.STRING
});


// Message.hasOne(Room);
// Message.hasOne(User);
// User.hasMany(Message);
// Room.hasMany(Message);

// Room.sync().then(function() {
//   console.log('synced');
//   var newRoom = Room.build({name: 'aroom'});
//   newRoom.save().then(function() {
//     console.log('saved');
//   });
// });

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
User.sync().then(function() {
//   /* This callback function is called once sync succeeds. */

//   // now instantiate an object and save it:
  var newUser = User.build({username: "Jean Valjean"});
  newUser.save().then(function() {

//     /* This callback function is called once saving succeeds. */

//     // Retrieve objects from the database:
    User.findAll({ where: {username: "Jean Valjean"} }).then(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].username + " exists");
      }
    });
  });
});
