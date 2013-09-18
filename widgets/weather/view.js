(function() {
    Flexical.views.weather = Flexical.Widget.extend({
        update: function(data) {
            TEMP_CONST = 273.15;
            this.$('[flxl-id=location]').text(data.name);
            this.$('[flxl-id=temp]').text(data.main.temp-TEMP_CONST);

            weather = data.list[0].main.weather[0]
            this.$('[flxl-id=title]').text(weather.main);
            this.$('[flxl-id=desc]').text(weather.description);
        }
    });
})();
