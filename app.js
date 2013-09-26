//
// Flexical - The Fantastically Flexible Status Board
//

var fs = require('fs'),
    _ = require('underscore'),
    path = require('path'),
    express = require('express'),
    socketio = require('socket.io'),
    cons = require('consolidate'),
    swig = require('swig'),
    http = require('http'),
    uglify = require('uglify-js');

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
_.each(fs.readdirSync('./boards'), function(directory) {
    if (!fs.existsSync('./boards/' + directory + '/board.js')) {
        // No board.js found, nothing to do here
        return;
    }
    var board = new Board(require('./boards/' + directory + '/board.js'));
    board.path = path.resolve('./boards/' + directory);
    board.url = '/boards/' + board.id;
    board.io = io.of('/' + board.id);
    app.use(board.url + '/assets', express.static(board.path + '/assets'));
    app.get(board.url + '/bundle.js', function(req, res) {
        var files = _.map(_.uniq(_.pluck(board.widgets, 'type')), function(type) {
            return './widgets/' + type + '/view.js';
        });
        res.set({
            'Content-Type': 'text/javascript'
        })
        res.send(uglify.minify(files, {
            compress: false,
        }).code);
    });
    app.get(board.url, function(req, res) {
        res.render(board.path + '/board.html', {
			media_url: '/media',
            asset_url: board.url + '/assets',
            bundle_url: board.url + '/bundle.js',
            board: board
        });
    });
    boards[board.id] = board;
    board.start();
});

//
// Here we go!
//
server.listen(3000);
