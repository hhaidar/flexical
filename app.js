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

app.configure(function() {
    app.engine('.html', cons.swig);
    app.set('view engine', 'html');
    swig.init({
        root: 'templates',
        allowErrors: true,
        cache: false
    });
    app.set('views', 'templates');
});

_.each(settings.boards, function(board, id) {
    if (!id.match(/^([\w.-]*)$/i)) {
        throw new Error('Not a valid Board ID: ' + id);
        return;
    }
    var boardPath = path.resolve('boards/' + id);
    app.use('/assets/' + id, express.static(boardPath + '/assets'));
    app.get(board.url, function(req, res) {
        res.render(boardPath + '/board.html', {
            board: {
                title: board.title,
                url: board.url,
                asset_url: '/assets/' + id
            }
        });
    });
})

server.listen(settings.port);