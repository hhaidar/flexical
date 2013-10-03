(function() {
    Flexical.views.jenkins = Flexical.Widget.extend({
        init: function() {
            console.log(this.$('.template').html())
            this.template = Handlebars.compile(this.$('.template').html());
        },
        update: function(tests) {
            var $list = this.$el.find('.flxl-status-list');
            _.each(tests, function(test) {
                var $item = $list.find('[flxl-id=' + test.name + ']');
                if ($item.length > 0) {
                    $item.replaceWith(this.template(test));
                    return;
                }
                $list.append(this.template(test))
            }, this);
        }
    });
})();
