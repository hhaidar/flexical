(function(W) {
    var Flexical = window.Flexical || {};
    Flexical.coreViews = Flexical.coreViews || {};
    Flexical.views = Flexical.views || {};
    //
    // Board
    //
    Flexical.Board = Backbone.View.extend({
        el: 'body',
        initialize: function() {
            this.widgets = {};
            _.each(this.options.widgets, function(widget) {
                this.addWidget(new (Flexical.views[widget.type] || Flexical.Widget)(widget));
                this.widgets[widget.id].once('loaded', this.doneLoading, this);
            }, this);
            this.listen();
            this.render();
        },
        render: function() {
            this.$('.flxl-connection-status').addClass('hide');
            this.$('.flxl-board').addClass('hide');
            //
            // Slider
            //
            if (this.$('.flxl-slider').length > 0) {
                this.slider = new Flexical.coreViews.Slider();
            }
        },
        listen: function() {
            var that = this;
            this.socket = io.connect('/' + this.id);
            this.socket.on('connect', function() {
                that.$('.flxl-connection-status').addClass('hide');
            });
            this.socket.on('disconnect', function() {
                that.$('.flxl-connection-status').removeClass('hide');
            });
            this.socket.on('job.update', function(id, data) {
                _.each(_.where(that.widgets, { job: id }), function(widget) {
                    widget.trigger('job.update', data);
                });
            });
        },
        addWidget: function(widget) {
            this.widgets[widget.id] = widget;
        },
        doneLoading: function() {
            var notLoaded = _.filter(this.widgets, function(widget) {
                return widget.loaded != true;
            }, this);
            var loaded = _.size(this.widgets) - _.size(notLoaded);
            var status = loaded + '/' + _.size(this.widgets) + ' Widgets';
            this.$('.flxl-loading-status').text(status);
            if (_.size(notLoaded) <= 0) {
                setTimeout(function() {
                    this.$('.flxl-loading').addClass('hide');
                    setTimeout(function() {
                        this.$('.flxl-board').removeClass('hide');
                    }, 200);
                }, 1 * 1000);
            }
        }
    });
    //
    // Board Sub-views
    //
    Flexical.coreViews.Slider = Backbone.View.extend({
        el: '.flxl-slider',
        keys: {
            'right': 'next',
            'left': 'prev',
            'up': 'up',
            'down': 'down'
        },
        initialize: function() {
            this.slider = this.$el.owlCarousel({
                singleItem: true,
                navigation: false,
                pagination: false,
                responsive: true,
                autoHeight: true,
                lazyEffect: false,
                rewindNav: false
            }).data('owlCarousel');
        },
        down: function() {
            this.$el.css('-webkit-transform', 'scale(0.8)')
        },
        up: function() {
            this.$el.css('-webkit-transform', 'scale(1)')
        },
        prev: function() {
            this.slider.prev();
        },
        next: function() {
            this.slider.next();
        }
    });
    //
    // Widget
    //
    Flexical.Widget = Backbone.Epoxy.View.extend({
        initialize: function() {
            this.setElement('#' + this.id);
            this.job = this.options.id;
            this.init = this.options.init || this.init;
            this.update = this.options.update || this.update;
            this.on('job.update', this.update, this);
            this.once('job.update', this.doneLoading, this);
            this.init();
        },
        init: function() {
            // Placeholder ATM
        },
        update: function(data) {
            console.log(data);
            // Placeholder ATM
        },
        doneLoading: function() {
            this.loaded = true;
            this.trigger('loaded');
        }
    });
    //
    // Let's go!
    //
    window.Flexical = Flexical;
})();