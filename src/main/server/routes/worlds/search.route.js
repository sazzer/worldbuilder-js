import Boom from 'boom';
import Joi from 'joi';
import {Resource} from '../../jsonapi/resource';
import {Resources} from '../../jsonapi/resources';

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
            const resources = new Resources('worlds');
            resources.setSelf(request.to('searchWorlds'));

            const resource1 = resources.addResource('abcdef');
            const selfUrl = request.to('getWorld', {
                params: {
                    world: 'abcdef'
                }
            });

            resource1.setSelf(selfUrl);
            resource1.addAttribute('name', 'Discworld');
            resource1.addAttribute('version', 1);
            resource1.addAttribute('created', '2016-03-30T07:23:08+00:00');
            resource1.addAttribute('updated', '2016-03-30T07:23:08+00:00');

            resource1.addRelationship('owner', 'users', '123456');
            resource1.getRelationship('owner').addLink('self', `${selfUrl}/relationships/owner`);
            resource1.getRelationship('owner').addLink('related', `${selfUrl}/owner`);
            reply(resources.build());
        }
    }
};
