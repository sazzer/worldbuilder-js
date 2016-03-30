import {startServer} from './server';

startServer()
    .then((server) => {
        console.log('Started server');
    }).catch((err) => {
        console.log(`Error starting server: ${err}`);
    });
