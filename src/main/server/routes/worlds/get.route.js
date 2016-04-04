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
            schema: Joi.object().keys({
                name: Joi.string().required().description('The name of the world'),
                version: Joi.number().integer().required().description('The version number of the record'),
                created: Joi.date().iso().required().description('The timestamp of when the world was created'),
                updated: Joi.date().iso().description('The timestamp of when the world was last updated'),
                _links: Joi.object().keys({
                    self: Joi.object().keys({
                        href: Joi.string().uri().required()
                    })
                }),
                _embedded: Joi.object().keys({
                    owner: Joi.object().keys({
                        name: Joi.string().required().description('The name of the owner of this world'),
                        _links: Joi.object().keys({
                            self: Joi.object().keys({
                                href: Joi.string().uri().required()
                            })
                        })
                    })
                })
            })
        },
        validate: {
            params: {
                world: Joi.string().required().description('The ID of the World to retrieve')
            },
            failAction: 'error'
        },
        handler: (request, reply) => {
            const worldId = request.params.world;
            reply({
                name: 'Discworld',
                version: 1,
                created: '2016-03-30T07:23:08+00:00',
                updated: '2016-03-30T07:23:08+00:00',
                _links: {
                    self: {
                        href: request.to('getWorld', {
                            params: {world: worldId}
                        })
                    }
                },
                _embedded: {
                    owner: {
                        name: 'Terry Pratchett',
                        _links: {
                            self: {
                                href: 'http://localhost:3000/api/users/12345'
                            }
                        }
                    }
                }
            });
        }
    }
};
