//
// Flexical - The Fantastically Flexible Status Board
//

var _ = require('underscore'),
    path = require('path'),
    express = require('express'),
    socketio = require('socket.io'),
    cons = require('consolidate'),
    swig = require('swig'),
    http = require('http');

var settings = require('./settings');

var app = express(),
    server = http.createServer(app),
    io = socketio.listen(server);

var Widget = require('./lib/widget.js');

var boards = {};

app.configure(function() {
    app.engine('.html', cons.swig);
    app.set('view engine', 'html');
    swig.init({
        root: 'templates',
        allowErrors: true,
        cache: false
    });
    app.set('views', 'templates');
    app.use('/media', express.static(__dirname + '/media'));
});

io.set('transports', ['websocket']);
io.set('log level', 0);

io.sockets.on('connection', function(client) {
    client.emit('init', 'hello');
});

//
// Load them boards
//

_.each(settings.boards, function(board, id) {
    if (!id.match(/^([\w.-]*)$/i)) {
        throw new Error('Not a valid Board ID: ' + id);
        return;
    }
    board.path = path.resolve('boards/' + id);
    // Board asset url
    app.use('/assets/' + id, express.static(board.path + '/assets'));
    // Board url
    app.get(board.url, function(req, res) {
        res.render(board.path + '/board.html', {
            media_url: '/media',
            board: {
                title: board.title,
                url: board.url,
                asset_url: '/assets/' + id
            }
        });
    });
    // Load this board's widgets
    board.widgets = {}; 
    _.each(require(board.path + '/widgets.backend.js'), function(widget, id) {
        board.widgets[id] = widget;
        board.widgets[id].start();
    });
    // Add board to boards
    boards[id] = board;
});

server.listen(settings.port);
