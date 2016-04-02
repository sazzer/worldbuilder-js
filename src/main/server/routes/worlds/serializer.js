import {Serializer as JSONAPISerializer} from 'jsonapi-serializer';

const worldAttributes = [
    'name',
    'version',
    'created',
    'updated',
    'owner'
];

const ownerAttributes = [
    'name',
    'version',
    'created',
    'updated'
];

const includeOwner = true;

/**
 * Construct the serializer for individual World records
 * @param {Request} request the incoming request
 * @return {JSONAPISerializer} The serializer
 */
export function worldSerializer(request) {
    return new JSONAPISerializer('worlds', {
        topLevelLinks: {
            self: (data) => {
                return request.to('getWorld', {
                    params: {
                        world: data.id
                    }
                });
            }
        },
        attributes: worldAttributes,
        typeForAttribute: (attribute) => {
            return (attribute === 'owner') ? 'users' : attribute;
        },
        owner: {
            type: 'users',
            ref: 'id',
            included: includeOwner,
            attributes: ownerAttributes,
            relationshipLinks: {
                self: (data) => {
                    return request.to('getWorld', {
                        params: {
                            world: data.id
                        }
                    }) + '/relationships/owner'
                },
                related: (data) => {
                    return request.to('getWorld', {
                        params: {
                            world: data.id
                        }
                    }) + '/owner'
                }
            }
        }
    });
}

/**
 * Construct the serializer for a collection of World records
 * @param {Request} request the incoming request
 * @return {JSONAPISerializer} The serializer
 */
export function worldsSerializer(request) {
    return new JSONAPISerializer('worlds', {
        topLevelLinks: {
            self: (data) => {
                return request.to('searchWorlds');
            },
            next: (data) => {
                return request.to('searchWorlds') + '?page[cursor]=eyJjb2xsZWN0aW9uIjoid29ybGRzIiwib2Zmc2V0IjoxMH0K&page[size]=10';
            }
        },
        dataLinks: {
            self: (data) => {
                return request.to('getWorld', {
                    params: {
                        world: data.id
                    }
                });
            }
        },
        attributes: worldAttributes,
        typeForAttribute: (attribute) => {
            return (attribute === 'owner') ? 'users' : attribute;
        },
        owner: {
            type: 'users',
            ref: 'id',
            included: includeOwner,
            attributes: ownerAttributes,
            relationshipLinks: {
                self: (data) => {
                    return request.to('getWorld', {
                        params: {
                            world: data.id
                        }
                    }) + '/relationships/owner'
                },
                related: (data) => {
                    return request.to('getWorld', {
                        params: {
                            world: data.id
                        }
                    }) + '/owner'
                }
            }
        }
    });
}
