var current_headline_id = 0;
var headlines = '';
var new_headlines = '';
(function() {
    Flexical.views.ticker = Flexical.Widget.extend({
        init: function() {
			this.$('#ticker').marquee({ speed: 1 });
			this.doneLoading();
        },
		update: function(ticker) {
			new_headlines = (ticker.headlines);
			if (headlines == '') {
				headlines = new_headlines;
				this.$('#ticker').text(headlines[0]);
				current_headline_id = 0;
			}
        }
    });
})();

(function($) {
	$.fn.textWidth = function(){
		 var calc = '<span style="white-space:nowrap;display:none">' + $(this).text() + '</span>';
		 $(this).parent().append(calc);
		 $(this).parent().find('span:last').css('font-size', $(this).css('font-size'))
		 var width = $(this).parent().find('span:last').width();
		 $(this).parent().find('span:last').remove();
		return width;
	};
	
	$.fn.marquee = function(args) {
		var that = $(this);
		var textWidth = that.textWidth(),
			offset = that.width(),
			width = 0,
			css = {
				'text-indent' : that.css('text-indent'),
				'overflow' : that.css('overflow'),
				'white-space' : that.css('white-space')
			},
			marqueeCss = {
				'text-indent' : 0,
				'overflow' : 'hidden',
				'white-space' : 'nowrap'
			},
			args = $.extend(true, { scrollSpeed: 35, delay: 5000, leftToRight: false }, args),
			stop = textWidth*-1,
			dfd = $.Deferred();
		
		function wait() {
			offset = that.width()
			width = offset;
			that.css('text-indent', width + 'px');
			current_headline_id++;
			if (current_headline_id < headlines.length) {
				that.text(headlines[current_headline_id]);
			} else {
				headlines = new_headlines;
				current_headline_id = 0;
				that.text(headlines[0]);
			}
			stop = that.textWidth()*-1;
		};
		
		function scrollOut() {
			if(!that.length) return dfd.reject();
			if (headlines[current_headline_id] == that.text() && stop == 0) {
				stop = that.textWidth()*-1;
			}

			if(width <= stop) {
				that.css('text-indent', width + 'px');
				wait();
				scrollIn();
			} else {
				that.css('text-indent', width + 'px');
				if(args.leftToRight) {
					width = width - (stop/args.scrollSpeed);
				} else {
					width = width + (stop/args.scrollSpeed);
				}
				setTimeout(scrollOut, 1);
			}
		};
		
		function scrollIn() {
			if(width <= 0) {
				that.css('text-indent', '0px');
				setTimeout(scrollOut, args.delay);
			} else {
				width = width - offset/args.scrollSpeed;
				that.css('text-indent', width + 'px');
				setTimeout(scrollIn, 1);
			}
		};

		if(args.leftToRight) {
			width = textWidth*-1;
			width++;
			stop = offset;
		} else {
			width = width -10;            
		}
		that.css(marqueeCss);
		setTimeout(scrollOut, args.delay);
		return dfd.promise();
	};
})(jQuery);
