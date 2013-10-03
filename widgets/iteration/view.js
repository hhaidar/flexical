(function() {
    Flexical.views.iteration = Flexical.Widget.extend({
        init: function() {
            var context = this.$('.chart').get(0).getContext('2d');
            this.chart =  new Chart(context);
            this.colorMap = {
                dev: '#e64c65',
                qa: '#fcb150',
                review: '#4fc4f6',
                closed: '#11a8ab'
            }
            this.doneLoading();
        },
        update: function(iteration) {
            var chartData = [];
            this.$('[data-id=version]').text(iteration.name);
            _.each(iteration.statuses, function(status) {
                this.$('[data-id=' + status.name + ']').find('.count').text(status.total);
                chartData.push({
                    value: status.total,
                    color: this.colorMap[status.name] || '#ccc'
                })
            }, this);
            this.chart.Doughnut(chartData, {
                animation: false,
                segmentShowStroke: false,
                percentageInnerCutout: 60,
            });
        }
    });
})();
