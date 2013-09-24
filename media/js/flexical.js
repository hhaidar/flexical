(function(W) {
    var Flexical = window.Flexical || {};
    Flexical.views = Flexical.views || {};
    //
    // Board
    //
    Flexical.Board = Backbone.View.extend({
        initialize: function() {
            this.widgets = {};
            _.each(this.options.widgets, function(widget, id) {
                this.widgets[id] = new (Flexical.views[widget.type] || Flexical.Widget)(widget);
            }, this);
            this.listen();
        },
        render: function() {
            // HUEHUEHUE
        },
        listen: function() {
            var that = this;
            this.socket = io.connect('/' + this.id);
            this.socket.on('job.update', function(id, data) {
                _.each(_.where(that.widgets, { job: id }), function(widget) {
                    widget.trigger('job.update', data);
                });
            });
        },
        addWidget: function(widget) {
            this.widgets[widget.id] = widget;
        }
    });
    //
    // Widget
    //
    Flexical.Widget = Backbone.View.extend({
        initialize: function() {
            this.job = this.options.job;
            this.init = this.options.init || this.init;
            this.update = this.options.update || this.update;
            this.on('job.update', this.update, this);
            this.init();
        },
        init: function() {
            // Placeholder ATM
        },
        update: function() {
            // Placeholder ATM
        }
    });
    window.Flexical = Flexical;
})();