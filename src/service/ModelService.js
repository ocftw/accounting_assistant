//@ts-check
import { AbstractModel } from '../model/AbstractModel';
import AbstractService from './AbstractService';

export default class extends AbstractService {

    static getName() {
        return "ModelService";
    }

    constructor() {
        super();
        this.models = new Map();
    }

    /**
     * addModel
     * @param {typeof AbstractModel} model 
     */
    addModel(model) {
        this.models.set(model.getName(), model);
    }

    /**
     * hasModel
     * @param {string} id 
     */
    hasModel(id) {
        return this.models.has(id);
    }

    /**
     * getModel
     * @param {string} id 
     */
    getModel(id) {
        return this.models.get(id);
    }
}