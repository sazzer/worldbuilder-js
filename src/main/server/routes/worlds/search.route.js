import Boom from 'boom';
import Joi from 'joi';
import {worldsSerializer} from './serializer';

export const routes = {
    method: 'GET',
    path: '/api/worlds',
    config: {
        id: 'searchWorlds',
        description: 'Search all of the available worlds',
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
            const worlds = [{
                id: 'abcdef',
                name: 'Discworld',
                version: 1,
                created: '2016-03-30T07:23:08+00:00',
                updated: '2016-03-30T07:23:08+00:00',
                owner: {
                    id: 12345,
                    name: 'Terry Pratchett',
                    version: 1,
                    created: '2016-03-30T07:23:08+00:00',
                    updated: '2016-03-30T07:23:08+00:00'
                }
            }, {
                id: 'ghijkl',
                name: 'Strata',
                version: 1,
                created: '2011-01-01T07:23:08+00:00',
                updated: '2011-01-01T07:23:08+00:00',
                owner: {
                    id: 12345,
                    name: 'Terry Pratchett',
                    version: 1,
                    created: '2016-03-30T07:23:08+00:00',
                    updated: '2016-03-30T07:23:08+00:00'
                }
            }];

            reply(worldsSerializer(request).serialize(worlds));
        }
    }
};
