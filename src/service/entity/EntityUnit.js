//@ts-check

import CellPath from "./CellPath";
import EntitySource from "./EntitySource";

export default class {
    
    /**
     * @param {EntitySource} entitySource
     * @param {string} value value of cell
     * @param {CellPath} cellPath 
     */
    constructor(entitySource, value, cellPath) {
        this._entitySource = entitySource;
        this._value = value;
        this._cellPath = cellPath;
        this._isEdited = false;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;

        if (!this._isEdited) {
            this._isEdited = true;
            this._entitySource.addEditCell(this);
        }
    }

    get cellPath() {
        return this._cellPath;
    }

    set cellPath(value) {
        throw new Error('cellPath is immutable.');
    }

    toString() {
        return this._value;
    }
}