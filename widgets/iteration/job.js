var request = require('request');

module.exports = {
    interval: 10 * 60,
    fetch: function(job) {
        var options = {
            url: job.options.url,
            rejectUnauthorized: job.options.rejectUnauthorized,
            auth: {
                user: job.options.username,
                pass: job.options.password
            },
            json: true
        }
        request.get(options, function (err, res, data) {
            job.continue(data.progress.iterations[0]);
            console.log([data.progress.iterations]);
        });
    }
}