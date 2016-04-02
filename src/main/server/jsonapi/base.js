/**
 * Base class for all JSONAPI Representations, giving some common funtionality
 */
export class Base {
    /**
     * Construct the Base
     * @param {String} type The type of resource we are working with
     */
    constructor(type) {
        this._type = type;
        this._links = {};
    }

    /**
     * Get the type of the resource
     * @return {String} the type
     */
    get type() {
        return this._type;
    }

    /**
     * Get the links of the resource
     * @return {Object} the links
     */
    get links() {
        return this._links;
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

}
