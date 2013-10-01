(function() {
    Flexical.views.weather = Flexical.Widget.extend({
        init: function() {
            this.skycons = new Skycons({
                'color': '#fff'
            })
            this.skycons.add(this.$('[data-id=skycon]').get(0), Skycons.CLEAR_DAY);
            this.skycons.play();
        },
        update: function(weather) {
            this.skycons.set(this.$('[data-id=skycon]').get(0), Skycons[weather.icon]);
            this.$('[data-id=temp]').text(weather.temp);
            this.$('[data-id=title]').text(weather.title);
            this.$('[data-id=date]').text(moment().format('dddd Do, MMMM'));
        }
    });
})();
