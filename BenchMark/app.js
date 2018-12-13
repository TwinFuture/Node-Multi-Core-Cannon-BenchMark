const cluster = require('cluster'),
    numCPUs = 3;

if (cluster.isMaster) {
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log('A process exit was triggered, NodeJS test server shutting down now');
        process.exit(1);
    });
} else {
    // Task for forked worker
    require('./bench');
}