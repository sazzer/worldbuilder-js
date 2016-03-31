import Boom from 'boom';
import Joi from 'joi';

export const routes = {
    method: 'GET',
    path: '/api/worlds/{world}',
    config: {
        id: 'getWorld',
        description: 'Get a single World by it\'s unique ID',
        tags: ['api', 'world'],
        response: {
            failAction: 'log',
            options: {

            },
            schema: Joi.object()
        },
        validate: {
            failAction: 'error'
        },
        handler: (request, reply) => {
            reply({
                id: 'abcdef',
                name: 'Discworld',
                version: 1,
                created: '2016-03-30T07:23:08+00:00',
                updated: '2016-03-30T07:23:08+00:00',
                owner: {
                    id: '123456',
                    name: 'Terry Pratchett'
                }
            });
        }
    }
};
