import Boom from 'boom';
import Joi from 'joi';
import {WorldSerializer} from './serializer';

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
            params: {
                world: Joi.string().required().description('The ID of the World to retrieve')
            },
            failAction: 'error'
        },
        handler: (request, reply) => {
            const worldId = request.params.world;
            const world = {
                id: worldId,
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
            };

            reply(WorldSerializer.serialize(world, {
                request
            }));
        }
    }
};
