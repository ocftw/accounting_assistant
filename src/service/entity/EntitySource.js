//@ts-check

import CellPath from "./CellPath";
import EntityUnit from "./EntityUnit";

export default class {
    
    /**
     * @param {GoogleAppsScript.Spreadsheet.Range} range 
     */
    constructor(range) {
        /** @type {EntityUnit[]} */
        this.editCells = [];

        this.range = range;
        this.values = range.getValues();
        this.entities = this.packageEntities();
    }

    packageEntities() {
        /** @type {[EntityUnit[]]} */
        // @ts-ignore
        let entities = [];

        for (let row = 0; row < this.values.length; row++){
            //@ts-ignore
            entities[row] = [];
            for (let column = 0; column < this.values[row].length; column++){
                entities[row][column] = new EntityUnit(this, this.values[row][column], new CellPath(row, column))
            }
        }

        return entities;
    }

    /**
     * addEditCell
     * @param {EntityUnit} entityUnit 
     */
    addEditCell(entityUnit) {
        this.editCells.push(entityUnit);
    }

    getEntities() {
        return this.entities;
    }

    refresh() {
        this.editCells.forEach((entityUnit) => {
            let cellPath = entityUnit.cellPath;
            this.values[cellPath.row][cellPath.column] = entityUnit.value;
        })

        this.range.setValues(this.values);
        this.editCells = [];
    }
}