const cluster = require('cluster');
const os = require('os');

function setupCluster(startServerFunction) {
    const totalCPUs = os.cpus().length;

    if (cluster.isPrimary) {
        console.log(`Primary process ${process.pid} is running`);

        // Fork workers equal to the number of CPU cores
        for (let i = 0; i < totalCPUs; i++) {
            cluster.fork();
        }

        // If a worker dies, you can log or restart
        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died. Starting a new one.`);
            cluster.fork();
        });
    } else {
        // Worker process runs the actual server
        startServerFunction();
    }
}




const express = require('express');
const setupCluster = require('./cluster');

function startExpressServer() {
    const app = express();

    app.get('/', (req, res) => {
        res.send(`Handled by worker ${process.pid}`);
    });

    app.listen(3000, () => {
        console.log(`Server started by worker ${process.pid}`);
    });
}

setupCluster(startExpressServer);
