module.exports = {
    interval: 1,
    fetch: function(job) {
        console.log(job.id);
        console.log(job.options);
        job.continue();
    }
}