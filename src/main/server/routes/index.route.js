import Boom from 'boom';

export const routes = [{
    method: 'GET',
    path: '/{page*}',
    handler: {
        file: {
            path: `${__dirname}/../../../static/index.html`
        }
    }
}, {
    method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    path: '/api/{path*}',
    handler: function(request, reply) {
        reply(Boom.notFound());
    }
}];
