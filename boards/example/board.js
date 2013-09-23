module.exports = {
    id: 'example',
    name: 'Example Board',
    widgets: {
        'internal-servers': {
            type: 'servers',
            interval: 60,
            servers: ['test']
        },
        'production-servers': {
            type: 'servers',
            interval: 60,
            servers: ['test']
        }
    }
}