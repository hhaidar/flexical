var io = require('socket.io-client'),
    url = require('url');

var request = require('request'),
    _       = require('underscore');

var chatJob = function(job) {
    var chatURL = url.format({
        'protocol': job.options.method+':',
        'hostname': job.options.host,
        'port': job.options.port,
        'query': {
            username: job.options.user,
            password: job.options.pass
        }
    });

    var socket = io.connect(chatURL, {
        reconnect: true
    });

    socket.on('connect', function() {
        socket.emit('room:join', job.options.room_id, function(room) {
        });
    });

    socket.on('disconnect', function() {
        console.log('disconnected');
    });

    socket.on('error', function(error) {
       console.log(error);
    });

    socket.on('room:messages:new', function(message) {
        job.continue(message, false);
    });

}

module.exports = {
    fetch: chatJob
}
