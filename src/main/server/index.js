import config from 'config';
import Glue from 'glue';

/**
 * Actually start a server listening.
 *
 * @return {Promise} a Promise for the server
 */
export function startServer() {
    let port = config.get('server.web.port');

    const manifest = {
        server: {

        },
        connections: [
            {
                port,
                labels: ['web']
            }
        ],
        registrations: [{
            plugin: 'inert'
        }, {
            plugin: 'vision'
        }, {
            plugin: 'blipp'
        }, {
            plugin: {
                register: 'good',
                options: {
                    opsInterval: 30000,
                    responsePayload: true,
                    reporters: [{
                        reporter: 'good-console',
                        events: {
                            ops: '*',
                            request: '*',
                            response: '*',
                            log: '*',
                            error: '*'
                        }
                    }]
                }
            }
        }, {
            plugin: {
                register: 'hale',
                options: {
                    path: '/api/health',
                    tags: ['health', 'monitor', 'api'],
                    metadata: {
                        name: 'worldbuilder'
                    }
                }
            }
        }, {
            plugin: {
                register: 'hapi-info',
                options: {
                    path: '/api/info'
                }
            }
        }, {
            plugin: {
                register: 'hapi-glob-routes',
                options: {
                    files: `${__dirname}/routes/**/*.route.js`
                }
            }
        }, {
            plugin: 'hapi-routes-status',
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        }, {
            plugin: {
                register: 'hapi-swaggered',
                options: {
                    endpoint: '/api/swagger',
                    stripPrefix: '/api',
                    info: {
                        title: 'Worldbuilder',
                        description: 'Cloud based Worldbuilding Service',
                        version: '1.0'
                    },
                    tagging: {
                        mode: 'path',

                    },
                    routeTags: ['api']
                }
            }
        }, {
            plugin: {
                register: 'hapi-swaggered-ui',
                options: {
                    path: '/api/docs'
                }
            }
        }, {
            plugin: 'hapi-to'
        }]
    };

    return new Promise((resolve, reject) => {
        const options = {
            relativeTo: __dirname
        };

        Glue.compose(manifest, options, (err, server) => {
            if (err) {
                reject(err);
            } else {
                server.start(() => {
                    resolve(server);
                });
            }
        })
    });
}
