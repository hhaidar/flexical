(function() {
    Flexical.views.servers = Flexical.Widget.extend({
        init: function() {
            var context = this.$('.chart').get(0).getContext('2d');
            this.chart =  new Chart(context);
        },
        update: function(data) {
            var servers = data.servers;
            var up = _.where(servers, { status: 'up' });
            var down = _.where(servers, { status: 'down' });
            var downMessage = '';
            this.$el.removeClass('flxl-widget-color-red flxl-widget-color-green');
            this.$el.addClass(down.length > 0 ? 'flxl-widget-color-red' : 'flxl-widget-color-green');
            this.$('[data-id=percent]').text(data.percent_up + '%');
            this.$('[data-id=count]').text(up.length + ' up');
            this.$('[data-id=state]').text(down.length > 0 ? 'ERR' : 'OK');
            _.each(down, function(server, index) {
                downMessage += server.name;
                if (!index + 1 == down.length) {
                    downMessage += ', '
                }
            });
            this.$('[data-id=down]').show(down.length > 0).text(downMessage);
            this.chart.Doughnut([
                { value: up.length, color: down.length > 0 ? '#be4055' : '#129281' },
                { value: servers.length - up.length, color: 'transparent' }
            ], {
                animation: false,
                segmentShowStroke: false,
                percentageInnerCutout: 80,
            });
        }
    });
})();