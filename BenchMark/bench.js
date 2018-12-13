const autocannon = require('autocannon');

module.exports = startBench();

function startBench() {
    const instance = autocannon({
        url: 'http://localhost:3000',
        connections: 100,
        duration: 80,
        pipelining: 100
    });

    autocannon.track(instance);

    // this is used to kill the instance on CTRL-C
    process.once('SIGINT', () => {
        instance.stop();
    });
}