//@ts-check

export default class CallPath {

    /**
     * @param {number} row 
     * @param {number} column 
     */
    constructor(row, column) {
        this._row = row;
        this._column = column;
    }

    get row() {
        return this._row;
    }

    get column() {
        return this._column;
    }

    set row(value) {
        throw new Error('row is immutable.');
    }

    set column(value) {
        throw new Error('column is immutable.');
    }
}