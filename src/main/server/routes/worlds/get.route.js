import Boom from 'boom';
import Joi from 'joi';
import {Resource} from '../../jsonapi/resource';

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
            const worldId = request.params.world;
            const selfUrl = request.to('getWorld', {
                params: {
                    world: worldId
                }
            });
            
            const resource = new Resource('worlds', worldId);
            resource.addLink('self', selfUrl);
            resource.addAttribute('name', 'Discworld');
            resource.addAttribute('version', 1);
            resource.addAttribute('created', '2016-03-30T07:23:08+00:00');
            resource.addAttribute('updated', '2016-03-30T07:23:08+00:00');
            
            resource.addRelationship('owner', 'users', '123456');
            resource.getRelationship('owner').addLink('self', `${selfUrl}/relationships/owner`);
            resource.getRelationship('owner').addLink('related', `${selfUrl}/owner`);
            reply(resource.build());
            /*
            reply({
                links: {
                    self: selfUrl
                },
                data: {
                    type: 'worlds',
                    id: worldId,
                    attributes: {
                        name: 'Discworld',
                        version: 1,
                        created: '2016-03-30T07:23:08+00:00',
                        updated: '2016-03-30T07:23:08+00:00'
                    },
                    relationships: {
                        owner: {
                            links: {
                                self: `${selfUrl}/relationships/owner`,
                                related: `${selfUrl}/owner`
                            },
                            data: {
                                type: 'users',
                                id: '123456'
                            }
                        }
                    }
                }
            });
            */
        }
    }
};
