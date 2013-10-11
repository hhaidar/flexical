(function() {
    Flexical.views.transit = Flexical.Widget.extend({
        init: function() {
            this.template = Handlebars.compile(this.$('.template').html());
        },
        update: function(stops_data) {
            var template = this.template;
            var $stop_list = this.$el.find('.flxl-transit-stop-list');
            $stop_list.html('');
            _(stops_data).each(function (stop_data) {

                var stop_prediction = stop_data.predictions[0];
                console.log(stop_prediction);

                if (stop_prediction.direction) {
                    var stop_name = stop_prediction.stopTitle;
                    var stop_direction = stop_prediction.direction.title;
                    var stop_time = stop_prediction.direction.prediction[0].seconds;
                    
                    $stop_list.append(template({
                        stop_name:  stop_name,
                        stop_direction: stop_direction,
                        stop_time: stop_time
                    }));
                }
            });
        }
    });
})();
