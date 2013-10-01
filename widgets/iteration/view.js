(function() {
    Flexical.views.iteration = Flexical.Widget.extend({
        init: function() {
            var context = this.$('.chart').get(0).getContext('2d');
            this.chart =  new Chart(context);
            this.chart.Doughnut([
                {
                    value: 42,
                    color:"#e64c65"
                },
                {
                    value : 7,
                    color : "#fcb150"
                },
                {
                    value : 12,
                    color : "#4fc4f6"
                },
                {
                    value : 5,
                    color : "#11a8ab"
                }
            ], {
                animation: false,
                segmentShowStroke: false,
                percentageInnerCutout: 60,
            });
            this.doneLoading();
        }
    });
})();
