//@ts-check

import ColumnDefine from "./ColumnDefine";

export default class {

    /**
     * constructor
     * @param {string} name 
     * @param {number} version 
     * @param {number} columnRow 
     * @param {number} dataStartRow
     * @param {ColumnDefine[]} columnDefines
     */
    constructor(name, version, columnRow, dataStartRow, columnDefines) {
        this.name = name;
        this.version = version;
        this.columnRow = columnRow;
        this.dataStartRow = dataStartRow;
        this.columnDefines = columnDefines;
    }
}