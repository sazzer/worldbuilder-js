import {startServer} from './server';
import {createLogger} from './log';

const LOG = createLogger('main');

startServer()
    .then((server) => {
        LOG.info('Started server');
    }).catch((err) => {
        LOG.error(`Error starting server: ${err}`);
    });
