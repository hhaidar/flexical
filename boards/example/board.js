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
