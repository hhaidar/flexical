$(function() {
    //
    // Clock
    //
    Flexical.board.addWidget(new Flexical.Widget({
        id: 'clock',
        el: '#clock',
        init: function() {
            var that = this;
            setInterval(function() {
                var time = moment().format('hh:mm:ss')
                  + '<small>' + moment().format('A') + '<small>';             
                that.$el.find('time').html(time);
            }, 500);
        }
    }));
    //
    // LEEEROOOY JEEEEEYNNKKKIIIINS
    //
    Flexical.board.addWidget(new Flexical.Widget({
        id: 'jenkins',
        job: 'jenkins',
        el: '#jenkins',
        update: function(tests) {
            var template = Handlebars.compile($('#template-status-item').html());
            var $list = this.$el.find('.flxl-status-list');
            _.each(tests, function(test) {
                var $item = $list.find('[flxl-id=' + test.name + ']');
                if ($item.length > 0) {
                    $item.replaceWith(template(test));
                    return;
                }
                $list.append(template(test))
            }, this);
            
        }
    }));
    //
    // Servers
    //
    var ServerWidget = Flexical.Widget.extend({
        update: function(data) {
            var servers = data.servers;
            var up = _.where(servers, { status: 'up' });
            var down = _.where(servers, { status: 'down' });
            this.$el.attr('flxl-color', down.length > 0 ? 'red' : 'green');
            this.$('[flxl-id=percent]').text(data.percent_up + '%');
            this.$('[flxl-id=count]').text(up.length);
            this.$('[flxl-id=state]').text(down.length > 0 ? 'ERR' : 'OK');
        }
    })
    Flexical.board.addWidget(new ServerWidget({
        id: 'production-servers',
        job: 'production-servers',
        el: '#production-servers',
    }));
    Flexical.board.addWidget(new ServerWidget({
        id: 'internal-servers',
        job: 'internal-servers',
        el: '#internal-servers',
    }));
})
