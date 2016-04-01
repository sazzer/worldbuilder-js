/**
 * Representation of a JSONAPI Relationship
 */
export class Relationship {
    /**
     * Construct the Relationship
     * @param {String} type The type of the Resource the Relationship links to
     * @param {Any} id The ID of the Resource the Relationship links to
     */
    constructor (type, id) {
        this._type = type;
        this._id = id;
        this._links = {};
    }

    /**
     * Add a single new link to the Resource
     * @param {String} name The name of the link
     * @param {String} value The value of the link
     */
    addLink(name, value) {
        this._links[name] = value;
    }
    
    /**
     * Set the Self link of the relationship
     * @param {String} value The value of the link
     */
    setSelf(value) {
        this.addLink('self', value);
    }
    
    /**
     * Set the Related link of the relationship
     * @param {String} value The value of the link
     */
    setRelated(value) {
        this.addLink('related', value);
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
