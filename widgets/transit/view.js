(function() {
    Flexical.views.transit = Flexical.Widget.extend({
        init: function() {
        },
        update: function(data) {
           this.$('[flxl-id=transit_title]').text(data.title);
           this.$('[flxl-id=transit_minutes]').text(data.next_minutes);
           this.$('[flxl-id=transit_stop_title]').text(data.stop_title);
        }
    });
})();
