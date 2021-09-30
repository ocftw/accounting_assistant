//@ts-check

import { AbstractModel } from "./AbstractModel";

export default class {

    /**
     * constructor
     * @param {string} name 
     * @param {number} version 
     * @param {typeof AbstractModel} model 
     */
    constructor(name, version, model) {
        this.name = name;
        this.version = version;
        this.model = model;
    }
}