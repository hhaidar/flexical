//
// My Board's Widgets (backend)
//

var Widget = require(process.cwd() + '/lib/widget.js');

var widgets = {};

//
// Weather
//
widgets.weather = new Widget({
    id: 'weather',
    fetch: function(widget) {
        console.log('fetched weather')
        widget.continue();
    }
});

//
// Iteration
//
widgets.iteration = new Widget({
    id: 'iteration',
    fetch: function(widget) {
        console.log('fetched iteration')
        widget.continue();
    }
});

//
// Servers
//
widgets.servers = new Widget({
    id: 'servers',
    fetch: function(widget) {
        console.log('fetched servers')
        widget.continue();
    }
});

//
// Transit
//
widgets.transit = new Widget({
    id: 'transit',
    fetch: function(widget) {
        console.log('fetched transit')
        widget.continue();
    }
});

module.exports = widgets;