var io = require('socket.io-client'),
    url = require('url');

var request = require('request'),
    _       = require('underscore');

var chatJob = function(job) {
    var jobs = [];
    var chatURL = url.format({
        'protocol': 'https:',
        'hostname': 'cairo.sdelements.com',
        'port': 9000,
        'query': {
            username: 'XXXXXXX',
            password: 'XXXXXXX'
        }
    });

    var socket = io.connect(chatURL, {
        reconnect: true
    });

    socket.on('room:messages:new', function(message) {
        jobs = _(body.jobs).map(function (job) {
          console.log('New message: "' + message.text + '" by "' + message.owner + '" in room "' + message.room + '#');
          return 'New message: "' + message.text + '" by "' + message.owner + '" in room "' + message.room + '#';
        });
        job.continue(jobs, false);
    });

}

module.exports = chatJob;
