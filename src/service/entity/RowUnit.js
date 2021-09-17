//@ts-check

import EntityUnit from "./EntityUnit";

export default class RowUnit {

    /**
     * @param {EntityUnit[]} entities
     * @param {number} rowNumber
     * @param {RowUnit} next
     */
    constructor(entities, rowNumber, next = null) {
        this.entities = entities;
        this.rowNumber = rowNumber;
        this.next = next;
    }

    /**
     * sync
     * @param {number} rowNumber
     */
    sync(rowNumber) {
        if (rowNumber != this.rowNumber) {
            this.entities.forEach((entity) => {
                entity._cellPath._row = rowNumber;
                entity.markEdited();
            });

            this.rowNumber = rowNumber;
        }

    }
}