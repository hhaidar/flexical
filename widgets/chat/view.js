(function() {
    Flexical.views.chat = Flexical.Widget.extend({
        update: function(data) {
            this.$('[flxl-id=message]').text(data);
        }
    });
})();
