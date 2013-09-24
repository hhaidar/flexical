(function() {
    Flexical.views.servers = Flexical.Widget.extend({
        update: function(data) {
            var servers = data.servers;
            var up = _.where(servers, { status: 'up' });
            var down = _.where(servers, { status: 'down' });
            this.$el.attr('flxl-color', down.length > 0 ? 'red' : 'green');
            this.$('[flxl-id=percent]').text(data.percent_up + '%');
            this.$('[flxl-id=count]').text(up.length);
            this.$('[flxl-id=state]').text(down.length > 0 ? 'ERR' : 'OK');
        }
    });
})();