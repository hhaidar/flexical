var _ = require('underscore'),
	$ = require('jquery'),
    request = require('request');

function getAuthHeader(auth_data) {
	if (auth_data) {	
		if (auth_data.user && auth_data.pass) {
			return {'Authorization': 'Basic ' + new Buffer(auth_data.user + ':' + auth_data.pass).toString('base64')}
		} else if (auth_data.token) {
			return auth_data.token;
		}
	}
	console.log('No auth data!');
}

var tickerJob = function(job) {
    var counter = job.options.display_max || -1;
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
				all_headlines.push({'headline': $(this).text()});
			});
		} else if (args['url'].match(/pivotaltracker\.com/g) && response.headers['content-type'].match(/application\/json/g)) {
			// Display PivotalTracker story titles for the current iteration
            data = $.parseJSON(data);
            if (response['statusCode'] > 400) {
                console.log('Error');
            } else if (data.length > 0) {
                var query_user_args = args;
                var user_initials = {};
                query_user_args.url = "https://www.pivotaltracker.com/services/v5/projects/" + data[0]['project_id'] + "/memberships";
                request(query_user_args, function (err, response, member_data) {
                    member_data = $.parseJSON(member_data);
                    if (member_data.error) {
                        console.log(member_data.error);
                    } else {
                        for (var i = 0; i < member_data.length; i++) {
                            user_initials[member_data[i]['person']['id']] = member_data[i]['person']['initials']
                        }
                        var stories = data[0]['stories'];

                        for (var i = 0; i < stories.length; i++) {
                            var story = stories[i];
                            if (story['current_state'] != 'accepted') {
                                var headline = '(' + story['current_state'] + ')[' + user_initials[stories[i]['owned_by_id']] + ']: ' + stories[i]['name'];
                                all_headlines.push({'headline': headline});
                            }
                        }
                        
                        if (all_headlines.length > 0 && job.options.display_max && job.options. display_max < all_headlines.length) {
                            all_headlines = all_headlines.splice(0, job.options.display_max);
                        }
                        job.continue({
                            headlines: all_headlines
                        });
                    }
                });
			}
		} else {
			console.log('Unable to parse response');
		}
	});
};

module.exports = {
    interval: 60,
    fetch: tickerJob
}
