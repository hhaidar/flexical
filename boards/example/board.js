module.exports = {
    id: 'example',
    name: 'Example Board',
    widgets: {
        'clock': {
            type: 'clock'
        },
        'ticker': {
            type: 'ticker',
     	    interval: 10,
			options: {
				//url: "https://www.pivotaltracker.com/services/v5/projects/940864/iterations?scope=current",
				url: 'https://melbourne.sdelements.com/userstories.rss',
				headers: {
					//'X-TrackerToken': ''
					'Authorization': 'Basic ' + new Buffer('board:zUDk9F0qWOT1oyX9RkYf').toString('base64')
				}/*,
				json_parser: 
					function(data) {
						// Parser that reads story titles in PT
						var story_titles = [];
						if (data.length > 0) {
							for (var i = 0; i < data[0]['stories'].length; i++) {
								var story = data[0]['stories'][i];
								story_titles.push(story['name']);
							}
						}
						return story_titles;
					}
				*/
			}
        },
        'transit': {
            type: 'transit',
            interval: 30,
            options: {
                stops: [
                    6853,
                    3088,
                    4184,
                    4185,
                    7355
                ]
            }
        },
        'internal-servers': {
            type: 'servers',
            interval: 10,
            options: {
               servers: require('./settings.js').INTERNAL
            }
        },
        'production-servers': {
            type: 'servers',
            interval: 10,
            options: {
               servers: require('./settings.js').PRODUCTION
            }
        }
    }
}
