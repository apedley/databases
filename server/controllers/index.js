var models = require('../models');
var bluebird = require('bluebird');


module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get().then(function(data) {
        // console.dir('logging data: ' + JSON.stringify(data));
        sendResponse(res, data);
      }).error(function(err) {
        console.error(err);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body);
      sendResponse(res, req.body);
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



