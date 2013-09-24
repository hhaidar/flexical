module.exports = {
    id: 'example',
    name: 'Example Board',
    widgets: {
        'internal-servers': {
            type: 'servers',
            interval: 10,
            options: {
               servers: ['test']
            }
        },
        'production-servers': {
            type: 'servers',
            interval: 10,
            options: {
               servers: ['test']
            }
        }
    }
}