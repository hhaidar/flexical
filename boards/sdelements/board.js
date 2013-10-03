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
            interval: 60,
            options: {
               servers: require('./settings.js')['internal-servers']
            }
        },
        'production-servers': {
            type: 'servers',
            interval: 60,
            options: {
               servers: require('./settings.js')['production-servers']
            }
        },
        'jenkins': {
            type: 'jenkins',
            options: {
                url: 'http://192.168.1.16:8080/api/json'
            }
        }
    }
}
