//@ts-check

import { remove } from "lodash";
import SheetUtil from "../../util/SheetUtil";
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

    /**
     * packageEntities
     * @returns {EntityUnit[][]}
     */
    packageEntities() {
        /** @type {EntityUnit[][]} */
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

    sortEmptyRow() {
        let removeRowNum = 0;

        remove(this.values, (value) => {
            if (SheetUtil.isEmptyRow(value)) {
                removeRowNum++;
                return true;
            } else return false;
        })

        for (let i = 0; i < removeRowNum; i++){
            let rowNum = this.values.length;
            this.values[rowNum] = [];
            for (let columnNum = 0; columnNum < this.values[0].length; columnNum++) this.values[rowNum][columnNum] = "";
        }

        this.range.setValues(this.values);
    }

    refresh() {
        this.editCells.forEach((entityUnit) => {
            let cellPath = entityUnit.cellPath;
            this.values[cellPath.row][cellPath.column] = entityUnit.isRemove ? "" : entityUnit.value;
        });

        this.range.setValues(this.values);
        this.editCells = [];
    }
}