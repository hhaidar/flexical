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
                    console.log('replaced');
                    $item.replaceWith(template(test));
                    return;
                }
                $list.append(template(test))
            }, this);
            
        }
    }));
})
