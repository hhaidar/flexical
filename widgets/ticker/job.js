var _ = require('underscore'),
	$ = require('jquery'),
    request = require('request');

var tickerJob = function(job) {
	args = {
		'method': 'get',
		'url': job.options.url,
		'headers': job.options.headers
	};

	if (args['url'].match(/^https/g)) {
		args['secureProtocol'] = 'SSLv3_method';
		args['rejectUnauthorized'] = false;
	}

	request(args, function (err, response, data) {
		var all_headlines = [];

		if (args['url'].match(/\.rss$/g)) {
			// For rss feeds we display the title
			$(data).find("item").find("title").each(function(index) {
				all_headlines.push($(this).text());
			});
		}
		else if (response.headers['content-type'].match(/application\/json/g) && job.options.json_parser) {
			// For json conent, user needs to implement a parser that returns a list of strings
			all_headlines = job.options.parser($.parseJSON(data));
		}
		else {
			console.log('Unable to parse response');
		}

		job.continue({
			headlines: all_headlines
		});
	});
};

module.exports = {
    interval: 60,
    fetch: tickerJob
}
