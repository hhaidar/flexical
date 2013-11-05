module.exports = {
    id: 'example',
    name: 'Example Board',
    widgets: {
        'clock': {
            type: 'clock'
        },
        'weather': {
            type: 'weather',
            options: {
                location: 'Toronto'
            }
        },
        'ticker': {
            type: 'ticker',
            interval: 10,
            options: {
                //url: "https://www.pivotaltracker.com/services/v5/projects/940864/iterations?scope=current",
                url: 'https://melbourne.sdelements.com/userstories.rss',
                auth: require('./settings.js').TICKER_AUTH
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
