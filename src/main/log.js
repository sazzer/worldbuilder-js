import bunyan from 'bunyan';

/**
 * Create a logger to use to write log messages to
 * @param {String} name The name to give to the logger
 * @return {Logger} the logger
 */
export function createLogger(name) {
    return bunyan.createLogger({
        name: name, 
        level: 'debug'
    });
}
