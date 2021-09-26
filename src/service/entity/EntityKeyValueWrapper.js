//@ts-check

import EntityUnit from "./EntityUnit";

export default class {

    /**
     * constructor
     * @param {EntityUnit} key 
     * @param {EntityUnit} value 
     */
    constructor(key, value) {
        this.keyEntity = key;
        this.valueEntity = value;
    }

    /**
     * @param {string} value
     */
    set value(value) {
        this.valueEntity.value = value;
    }

    toString() {
        return this.valueEntity.value;
    }
}