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
        /**@type {EntityUnit[][]} */
        this.entities = this.packageEntities();

        this.version = 0;
    }

    /**
     * packageEntities
     * @access private
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
                entities[row][column] = new EntityUnit(this, this.values[row][column], new CellPath(row, column));
            }
        }

        return entities;
    }

    /**
     * addNewRow
     * @param  {...string} values 
     */
    addNewRow(...values) {
        if (values.length != this.entities[0].length)
            throw new Error(`The number of new row's columns is inconsistent with the actual (Need ${this.entities.length} but it is ${values.length})`);
        
        let lastEmptyNum = 0;
        for (let i = this.entities.length - 1; i >= 0; i--){
            
            let isNotEmpty = this.entities[i].some((value) => {
                if (value.toString() !== "") return true;
            })

            if (!isNotEmpty) lastEmptyNum = i;
            else break;
        }

        if (lastEmptyNum !== this.entities.length) {
            let num = 0;
            this.entities[lastEmptyNum].forEach((entity) => {
                entity.value = values[num];
                num++;
            })
        }
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
        this.repackAll();
    }

    repackAll() {
        this.closeAll();

        /**@type {EntityUnit[][]} */
        this.entities = this.packageEntities();
        this.version += 1;
    }

    closeAll() {
        this.entities.forEach((values) => {
            values.forEach((value) => {
                value.markClosed();
            })
        })
    }

    /**
     * close
     * @param {number} row 
     */
    close(row) {
        this.entities[row].forEach((value) => {
                value.markClosed();
        })
    }

    refresh() {
        this.editCells.forEach((entityUnit) => {
            let cellPath = entityUnit.cellPath;
            this.values[cellPath.row][cellPath.column] = entityUnit.value;
        });

        this.range.setValues(this.values);
        this.editCells = [];
    }
}