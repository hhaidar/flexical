#!/usr/bin/env node

//
// Flexical - The Fantastically Flexible Status Board
//

var cons = require('consolidate'),
    express = require('express'),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    program = require('commander'),
    socketio = require('socket.io'),
    swig = require('swig'),
    uglifyCSS = require('uglifycss'),
    uglifyJS = require('uglify-js'),
    _ = require('underscore');

var app = express(),
    server = http.createServer(app),
    io = socketio.listen(server);

var Board = require('./lib/board.js');

var boards = {};

//
// Process command line arguments
//
program.version('1.0')
       .option('-p, --port <port>', 'port to run server on', parseInt)
       .parse(process.argv);

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
	res.render('home.html', {
		media_url: '/media',
		boards: _.map(boards, function(board) {
            return {
                id: board.id,
                name: board.name,
                count: _.pluck(board.widgets, 'id').length
		    }
		})
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
        });
        res.send(uglifyJS.minify(files, {
            compress: false,
        }).code);
    });
    app.get(board.url + '/bundle.css', function(req, res) {
        var files = [];
        _.each(_.uniq(_.pluck(board.widgets, 'type')), function(type) {
            if (fs.existsSync('./widgets/' + type + '/style.css'))
                files.push('./widgets/' + type + '/style.css');
        });
        res.set({
            'Content-Type': 'text/css'
        });
        res.send(uglifyCSS.processFiles(files, {
            compress: false,
        }));
    });
    app.get(board.url, function(req, res) {
        res.render(board.path + '/board.html', {
			media_url: '/media',
            asset_url: board.url + '/assets',
            bundle_js_url: board.url + '/bundle.js',
            bundle_css_url: board.url + '/bundle.css',
            board: board
        });
    });
    boards[board.id] = board;
    board.start();
});

//
// Here we go!
//
server.listen(program.port || 3000);

