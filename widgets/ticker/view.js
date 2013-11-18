(function($jQuery) {
    var headlines = [];
    var updated = false;
    var ticker = null;
           
    var ListItemView = Backbone.View.extend({
        tagName: "div",
        initialize: function() {
            this.$el.text( this.model.get("headline") );
        }
    });

    // Collection defining a Model and View:
    var ListCollection = Backbone.Collection.extend({
        model: Backbone.Model,
        view: ListItemView
    });

    Flexical.views.ticker = Flexical.Widget.extend({
        init: function() {
            ticker = this;
            this.collection = new ListCollection();
            this.$('marquee').marquee().on('stop', function(){
                if (updated) {
                    updated = false;
                    $(this).children(0).children().remove();
                    ticker.collection.reset(headlines);
                }
            });
        },
        update: function(ticker) {
            var new_headlines = (ticker.headlines);
            if (headlines != new_headlines) {
                headlines = new_headlines;
                headlines.unshift({'headline': 'User Stories:'});
                updated = true;
            }
        }
    });
})(jQuery);
