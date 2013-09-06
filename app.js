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

var Board = require('./lib/board.js');

var boards = {};

//
// Config
//
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
// Home
//
app.get('/', function(req, res) {
	res.render('boards.html', {
		media_url: '/media',
		boards: _.pluck(boards, 'name')
	});
});

//
// Load them boards
//
_.each(settings.boards, function(board, id) {
    id = board.id || id;
    if (!id.match(/^([\w.-]*)$/i)) {
        throw new Error('Not a valid Board ID: ' + id);
        return;
    }
	board.path = path.resolve('boards/' + id);
	// Create Board
	boards[id] = new Board({
		id: id,
		name: board.name,
		path: board.path = path.resolve('boards/' + id),
		jobs: require(board.path + '/jobs.js')
	});
	// Board Asset URL
    app.use('/boards/' + id + '/assets', express.static(board.path + '/assets'));
    // Board url
    app.get('/boards/' + id, function(req, res) {
        res.render(board.path + '/board.html', {
			media_url: '/media',
            board: {
                name: board.name,
                asset_url: '/boards/' + id + '/assets'
            }
        });
    });
	// Start Board
	boards[id].start();
});

//
// Here we go!
//
server.listen(settings.port);
