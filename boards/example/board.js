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
        'iteration': {
            type: 'iteration'
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
