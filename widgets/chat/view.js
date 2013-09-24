(function() {
    Flexical.views.chat = Flexical.Widget.extend({
        update: function(data) {
            this.$('[flxl-id=chat_avatar]').text(data.avatar);
            this.$('[flxl-id=chat_owner]').text(data.name);
            this.$('[flxl-id=chat_message]').text(data.text);
        }
    });
})();
