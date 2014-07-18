#!/usr/bin/env node

/**
 * FLEXICAL
 * > The fantastically flexible dashboard.
 **/

var _ = require('underscore'),
    fs = require('fs-extra'),
    path = require('path'),
    program = require('commander'),
    express = require('express.io'),
    nunjucks = require('nunjucks'),
    winston = require('winston');

var Board = require(__dirname + '/lib/board.js');

var settings = {};

// Load settings
if (fs.existsSync(process.cwd() + '/settings.js')) {
    settings = require(process.cwd() + '/settings.js');
}

// Logger
winston.add(winston.transports.File, {
    filename: __dirname + '/logs/out.log'
});

// Process command line arguments
program.version('0.3.0')
    .option('-p, --port <port>', 'port to run server on', parseInt)
    .option('-c, --create [path]', 'create an example board')
    .parse(process.argv);

if (program.create) {
    var destination = program.create;
    if (typeof program.create !== 'string') {
        destination = '.';
    }
    destination = path.resolve(destination);
    fs.copy(__dirname + '/example/', destination, function(err){
        if (err) {
            winston.log('error', err);
            return;
        }
        winston.log('info', 'success!');
    });
    return;
}

// Make express
var app = express().http().io();

// Public
app.use('/assets', express.static(__dirname + '/assets'));

// Templates
nunjucks.configure([process.cwd(), __dirname + '/templates'], {
    autoescape: true,
    express: app
}).addExtension('widget', new function() {
    this.tags = ['widget'];
    this.parse = function(parser, nodes, lexer) {
        var token = parser.nextToken();
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(token.value);
        return new nodes.CallExtension(this, 'run', args);
    }
    this.run = function(context, type, options) {
        var locals = context.getVariables(),
            html = nunjucks.render('widgets/flexical-' + type + '/widget.html', options);
        return new nunjucks.runtime.SafeString(html);
    }
});

// HTTP Middlewares
app.use(express.json());
app.use(express.urlencoded());

// From Flexical with Love
winston.log('info', 'Greetings Earth, I am '.cyan + 'Flexical'.magenta.bold)

// Make Board
var board = new Board(require(process.cwd() + '/board.js'), {
    app: app,
    winston: winston
}).start();

// Host Board
app.get('/', function(req, res) {
    res.render('board.html', {
        board: board
    });
});

// Go time!
app.listen(program.port || settings.port || 3000);
