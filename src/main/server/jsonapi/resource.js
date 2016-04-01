import {Relationship} from './relationship';

/**
 * Representation of a JSONAPI Resource
 */
export class Resource {
    /**
     * Construct the Resource
     * @param {String} type The type of the Resource
     * @param {Any} id The ID of the Resource
     */
    constructor (type, id) {
        this._type = type;
        this._id = id;
        this._attributes = {};
        this._links = {};
        this._relationships = {};
    }

    /**
     * Add a single new attribute to the Resource
     * @param {String} name The name of the attribute
     * @param {Any} value The value of the attribute
     */
    addAttribute(name, value) {
        this._attributes[name] = value;
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
     * Add a single new Relationship to the Resource
     * @param {String} name The name of the relationship
     * @param {String} type The type of the Resource the Relationship links to
     * @param {Any} id The ID of the Resource the Relationship links to
     */
    addRelationship(name, type, id) {
        const relationship = new Relationship(type, id);
        this._relationships[name] = relationship;
    }
    
    /**
     * Get the Relationship with the given name
     * @param {String} name The name of the relationship
     * @return {Relationship} The relationship
     */
    getRelationship(name) {
        return this._relationships[name];
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
        
        if (Object.keys(this._attributes).length > 0) {
            response.data.attributes = this._attributes;
        }
        
        if (Object.keys(this._links).length > 0) {
            response.links = this._links;
        }
        
        if (Object.keys(this._relationships).length > 0) {
            response.data.relationships = {};
            Object.keys(this._relationships).forEach((relationship) => {
                response.data.relationships[relationship] = this._relationships[relationship].build();
            });
        }
        
        return response;
    }
    
}
