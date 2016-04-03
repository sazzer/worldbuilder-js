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

export const WorldSerializer = new JSONAPISerializer('worlds', {
    topLevelLinks: {
        self: (data, opts) => {
            return opts.request.to('getWorld', {
                params: {
                    world: data.id
                }
            });
        }
    },
    attributes: worldAttributes,
    owner: {
        type: 'users',
        ref: 'id',
        included: includeOwner,
        attributes: ownerAttributes,
        relationshipLinks: {
            self: (data, current, dest, opts) => {
                return opts.request.to('getWorld', {
                    params: {
                        world: data.id
                    }
                }) + '/relationships/owner'
            },
            related: (data, current, dest, opts) => {
                return opts.request.to('getWorld', {
                    params: {
                        world: data.id
                    }
                }) + '/owner'
            }
        }
    }
});

export const WorldsSerializer = new JSONAPISerializer('worlds', {
    topLevelLinks: {
        self: (data, opts) => {
            return opts.request.to('searchWorlds');
        },
        next: (data, opts) => {
            return opts.request.to('searchWorlds') + '?page[cursor]=eyJjb2xsZWN0aW9uIjoid29ybGRzIiwib2Zmc2V0IjoxMH0K&page[size]=10';
        }
    },
    dataLinks: {
        self: (data, current, dest, opts) => {
            return opts.request.to('getWorld', {
                params: {
                    world: data.id
                }
            });
        }
    },
    attributes: worldAttributes,
    owner: {
        type: 'users',
        ref: 'id',
        included: includeOwner,
        attributes: ownerAttributes,
        relationshipLinks: {
            self: (data, current, dest, opts) => {
                return opts.request.to('getWorld', {
                    params: {
                        world: data.id
                    }
                }) + '/relationships/owner'
            },
            related: (data, current, dest, opts) => {
                return opts.request.to('getWorld', {
                    params: {
                        world: data.id
                    }
                }) + '/owner'
            }
        }
    }
});
