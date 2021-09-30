//@ts-check
import EntityUnit from '../entity/EntityUnit';
import EntityService from '../EntityService';

/**
 * Model
 * @param {typeof AbstractModel} target 
 */
function Model(target) {
    /**@type {EntityService} */
    let entityService = (FOSRequire("EntityService"));
    entityService.addModel(target);
}

class AbstractModel {
    constructor() {
        if (this.constructor == AbstractModel) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        /** @type {EntityUnit[]} */
        this.entities = [];
    }

    remove() {
        this.entities.forEach((entity) => entity.remove());
    }

    /**
     * @returns {string}
     */
    static getName() {
        throw new Error("Method 'getName()' must be implemented.");
    }

    /**
     * @returns {number}
     */
    static getVersion() {
        throw new Error("Method 'getVersion()' must be implemented.");
    }

    /**
     * @returns {string}
     */
    static getType() {
        return "Model";
    }
}

export {AbstractModel, Model}