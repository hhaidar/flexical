/**
 * Servers Widget
 **/
 
 module.exports = {
    name: 'Servers',
    description: 'What is up is up. What is down is down.',
    defaultInterval: 'every 5 seconds',
    fetch: function(job, done) {
        this.helpers.winston.log('info', 'Fetched widget ' + this.id.bold);
        done(null);
    }
}