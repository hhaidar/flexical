var _ = require('underscore'),
	$ = require('jquery'),
    request = require('request');

function getAuthHeader(auth_data) {
	if (auth_data) {	
		if (auth_data.user && auth_data.pass) {
			return {'Authorization': 'Basic ' + new Buffer(auth_data.user + ':' + auth_data.pass).toString('base64')}
		} else if (auth_data.token && auth_data.token_header) {
			var header = auth_data.token_header;
			return {header: auth_data.token};
		}
	}
	console.log('No auth data!');
}

var tickerJob = function(job) {
	var args = {
		'method': 'get',
		'url': job.options.url,
		'headers': getAuthHeader(job.options.auth)
	};

	if (args['url'].match(/^https/g)) {
		args['secureProtocol'] = 'SSLv3_method';
		args['rejectUnauthorized'] = false;
	}

	request(args, function (err, response, data) {
		var all_headlines = [];

		if (args['url'].match(/\.rss$/g)) {
			// Display all titles in the rss feed
			$(data).find("item title").each(function(index) {
				all_headlines.push($(this).text());
			});
		} else if (args['url'].match(/pivotaltracker\.com/g) && response.headers['content-type'].match(/application\/json/g)) {
			// Display PivotalTracker story titles for the current iteration			
			if (data.length > 0) {
				for (var i = 0; i < data[0]['stories'].length; i++) {
					var story = data[0]['stories'][i];
					all_headlines.push(story['name']);
				}
			}
		} else {
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
