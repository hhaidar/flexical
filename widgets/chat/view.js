(function() {
    Flexical.views.chat = Flexical.Widget.extend({
        update: function(data) {
            this.$('[flxl-id=chat_owner]').text(data.owner);
            this.$('[flxl-id=chat_message]').text(data.text);
        }
    });
})();
