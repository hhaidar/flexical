(function() {
    window.Flexical = window.Flexical || {};
    window.Flexical.Widget = Backbone.View.extend({
        initialize: function() {
            this.job = this.options.job;
            this.init = this.options.init || this.init;
            this.update = this.options.update || this.update;
            this.on('job.update', this.update, this);
            this.init();
        },
        init: function() {
            // Placeholder ATM
        },
        update: function() {
            // Placeholder ATM
        }
    });
})();