import {Base} from './base';

/**
 * Representation of a JSONAPI Relationship
 */
export class Relationship extends Base {
    /**
     * Construct the Relationship
     * @param {String} type The type of the Resource the Relationship links to
     * @param {Any} id The ID of the Resource the Relationship links to
     */
    constructor (type, id) {
        super(type);
        this._id = id;
    }

    /**
     * Actually build the JSONAPI object to send as a response
     * @return {Object} the JSON object to send as the response
     */
    build() {
        const response = {
            data: {
                type: this._type,
                id: this._id
            }
        };

        if (Object.keys(this._links).length > 0) {
            response.links = this._links;
        }

        return response;
    }
}
