import {Serializer as JSONAPISerializer} from 'jsonapi-serializer';

/**
 * Construct the serializer to use for representing worlds
 * @param {Request} request The request Object
 * @param {Boolean} collection True if we are representing a collection of worlds. False if it's just one
 */
export function worldSerializer(request, collection) {
    const options = {
        attributes: [
            'name',
            'version',
            'created',
            'updated',
            'owner'
        ],
        typeForAttribute: (attribute) => {
            return (attribute === 'owner') ? 'users' : attribute;
        },
        owner: {
            type: 'users',
            ref: 'id',
            included: false,
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
    };

    const resourceLinks = {
        self: (data) => {
            return request.to('getWorld', {
                params: {
                    world: data.id
                }
            });
        }
    };

    if (collection) {
        options.dataLinks = resourceLinks;
        options.topLevelLinks = {
            self: () => {
                return request.to('searchWorlds');
            }
        };
    } else {
        options.topLevelLinks = resourceLinks;
    }

    return new JSONAPISerializer('worlds', options);
}
