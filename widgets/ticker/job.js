var _ = require('underscore'), $ = require('jquery'),
    request = require('request');

var tickerJob = function(job) {
	feed_url = 'https://melbourne.sdelements.com/userstories.rss';
	user = 'board';
	pass = 'zUDk9F0qWOT1oyX9RkYf';

    request({
		'method': 'get',
        'url': feed_url,
		'secureProtocol': 'SSLv3_method',
		'rejectUnauthorized': false,
		'auth': {
			'user': user,
			'pass': pass
		}
    }, function (err, response, data) {
		var all_headlines = [];
		$(data).find("item").find("title").each(function(index) {
			console.log($(this).text());
			all_headlines.push($(this).text());
		});

        job.continue({
            headlines: all_headlines
        });
    });
};

module.exports = {
    interval: 60,
    fetch: tickerJob
}