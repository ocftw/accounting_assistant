//@ts-check
import EntityUnit from '../service/entity/EntityUnit';
import ModelService from '../service/ModelService'

/**
 * Model
 * @param {typeof AbstractModel} target 
 */
function Model(target) {
    /**@type {ModelService} */
    let modelService = (FOSRequire("ModelService"));
    modelService.addModel(target);
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
     * @returns {string}
     */
    static getType() {
        return "Model";
    }
}

export {AbstractModel, Model}