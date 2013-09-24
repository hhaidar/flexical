(function() {
    Flexical.views.weather = Flexical.Widget.extend({
        update: function(weather) {
            this.$('[flxl-id=location]').text(weather.location);
            this.$('[flxl-id=temp]').text(weather.temp);
            this.$('[flxl-id=title]').text(weather.title);
            this.$('[flxl-id=desc]').text(weather.description);
        }
    });
})();
