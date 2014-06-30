#!/usr/bin/env node

/*********************
 * Flexical
 *********************/

var _ = require('underscore'),
    fs = require('fs'),
    program = require('commander'),
    express = require('express.io'),
    nunjucks = require('nunjucks'),
    winston = require('winston');

var settings = {};

// Load settings
if (fs.existsSync(process.cwd() + '/settings.js')) {
    settings = require(process.cwd() + '/settings.js');
}

// Process command line arguments
program.version('0.3.0')
    .option('-p, --port <port>', 'port to run server on', parseInt)
    .parse(process.argv);

// Make express
var app = express().http().io();

// Public
app.use('/media', express.static(__dirname + '/media'));

// Templates
nunjucks.configure([process.cwd(), __dirname + '/templates'], {
    autoescape: true,
    express: app
});

// HTTP Middlewares
app.use(express.json());
app.use(express.urlencoded());

// Logger
winston.add(winston.transports.File, {
    filename: __dirname + '/logs/info.log'
});

// From Flexical with Love
winston.log('info', 'Greetings Earth, I am '.cyan + 'Flexical'.magenta.bold)

//
// Make Board
//
var board = require(process.cwd() + '/board.js');

winston.log('info', 'Found ' + board.name.bold);

_.each(board.widgets, function(widget) {
    console.log(widget);
});

app.get('/', function(req, res) {
    res.render('board.html', {
        
    });
});

// Go time!
app.listen(program.port || settings.port || 3000);
