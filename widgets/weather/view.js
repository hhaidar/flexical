(function() {
    Flexical.views.weather = Flexical.Widget.extend({
        init: function() {
            this.skycons = new Skycons({
                'color': '#fff'
            })
            this.skycons.add(this.$('[flxl-id=skycon]').get(0), Skycons.CLEAR_DAY);
            this.skycons.play();
        },
        update: function(weather) {
            this.skycons.set(this.$('[flxl-id=skycon]').get(0), Skycons[weather.icon]);
            this.$('[flxl-id=location]').text(weather.location);
            this.$('[flxl-id=temp]').text(weather.temp);
            this.$('[flxl-id=title]').text(weather.title);
            this.$('[flxl-id=desc]').text(weather.description);
        }
    });
})();
