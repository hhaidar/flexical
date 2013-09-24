var io = require('socket.io-client'),
    url = require('url');

var request = require('request'),
    _       = require('underscore');

var chatJob = function(job) {
    var chatURL = url.format({
        'protocol': 'https:',
        'hostname': 'cairo.sdelements.com',
        'port': 9000,
        'query': {
            username: 'XXXXX',
            password: 'XXXXX'
        }
    });

    var socket = io.connect(chatURL, {
        reconnect: true
    });

    socket.on('connect', function() {
        console.log('connected');
        room_id = '51bb59ae8603c0f01f0002af'
        socket.emit('room:join', room_id, function(room) {
            console.log('Joined room');
            socket.emit('room:messages:new', {
                room: room_id,
                text: 'Hello all you beautiful people!'
            });
        });        
    });

    socket.on('disconnect', function() {
        console.log('disconnected');
    });

    socket.on('error', function(error) {
       console.log(error);
    });

    socket.on('room:messages:new', function(message) {
        console.log('New message: "' + message.text + '" by "' + message.owner + '" in room "' + message.room + '#');
        job.continue(message, false);
    });

}

module.exports = {
    interval: 60,
    fetch: chatJob
}
