import {Resource} from './resource';
import {Base} from './base';

/**
 * Representation of a collection of JSONAPI Resources
 */
export class Resources extends Base {
    /**
     * Construct the Resources
     * @param {String} type The type of the Resource
     */
    constructor (type) {
        super(type);
        this._resources = [];
    }

    /**
     * Add a new resource to the list, automatically constructed with the correct
     * type.
     * @param {Any} id The ID of the resource
     * @return {Resource} the new resource
     */
    addResource(id) {
        const resource = new Resource(this._type, id);
        this._resources.push(resource);
        return resource;
    }

    /**
     * Actually build the JSONAPI object to send as a response
     * @return {Object} the JSON object to send as the response
     */
    build() {
        const response = {
            data: this._resources.map((resource) => {
                const result = {
                    type: resource.type,
                    id: resource.id
                };
                if (Object.keys(resource.attributes).length > 0) {
                    result.attributes = resource.attributes;
                }
                if (Object.keys(resource.links).length > 0) {
                    result.links = resource.links;
                }
                if (Object.keys(resource.relationships).length > 0) {
                    result.relationships = {};
                    Object.keys(resource.relationships).forEach((relationship) => {
                        result.relationships[relationship] = resource.relationships[relationship].build();
                    });
                }
                return result;
            })
        };

        if (Object.keys(this._links).length > 0) {
            response.links = this._links;
        }
        return response;
    }

}
