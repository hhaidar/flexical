(function() {
    window.Flexical = window.Flexical || {};
    window.Flexical.Board = Backbone.View.extend({
        initialize: function() {
            this.widgets = {};
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
})();