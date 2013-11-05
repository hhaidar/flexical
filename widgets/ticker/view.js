var headlines = [];
var updated = false;

(function($) {
	Flexical.views.ticker = Flexical.Widget.extend({
		init: function() {
			this.$('[data-id=marquee]').get(0).marquee().on('stop', function(){
				if (updated) {
					updated = false;
					$(this).children(0).children().remove();
					marqueeContent = '<div>User Stories</div>';

					for (var i = 0; i < headlines.length; i++){
						marqueeContent += '<div>' + headlines[i] + '</div>';
					}

					$(this).children(0).html(marqueeContent);
				}
			});
			this.doneLoading();
		},
		update: function(ticker) {
			var new_headlines = (ticker.headlines);
			if (headlines != new_headlines) {
				headlines = new_headlines;
				updated = true;
			}
		}
	});
})(jQuery);

