var models = require('../models');
var bluebird = require('bluebird');
var db = require('../db');



module.exports = {
  messages: {
    get: function (req, res) {
      db.Message.findAll(  { include: [db.User, db.Room] })
        .then(function(results){
           sendResponse(res, results);
          // res.json(results);
        });
      // models.messages.get().then(function(data) {
      //   // console.dir('logging data: ' + JSON.stringify(data));
      //   sendResponse(res, data);
      // }).error(function(err) {
      //   console.error(err);
      // });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var params = {
        body: req.body.body
      };
      db.User.findOrCreate( {where: { username: req.body.user }})
        .then(function(user){
          params['userid'] = user.id;
          db.Room.findOrCreate( { where: {name: req.body.roomname }})
            .then(function(room){
              params['roomid'] = room.id;
              db.Message.create( params ) 
                .then(function(message) {
                  console.log('created message');
                });
            });
        });
      // // models.messages.post(req.body);
      // sendResponse(res, req.body);
    } 
  },
  // rooms: {get,post}
  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};
/////////////
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/JSON"
};

var sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};



