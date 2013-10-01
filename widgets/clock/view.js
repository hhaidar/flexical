(function() {
    Flexical.views.clock = Flexical.Widget.extend({
        init: function() {
            var that = this;
            var makeTime = function() {
                var time = moment().format('hh:mm')
                  + ' <small>' + moment().format('A') + '<small>';             
                that.$el.find('time').html(time);
            }
            makeTime();
            setInterval(makeTime, 500);
            this.doneLoading();
        }
    });
})();
