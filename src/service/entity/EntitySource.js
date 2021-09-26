//@ts-check

import { remove } from "lodash";
import SheetUtil from "../../util/SheetUtil";
import CellPath from "./CellPath";
import EntityUnit from "./EntityUnit";
import RowUnit from "./RowUnit";
import RowUnitList from "./RowUnitList";

export default class {
    
    /**
     * @param {GoogleAppsScript.Spreadsheet.Range} range 
     */
    constructor(range) {
        /** @type {EntityUnit[]} */
        this.editCells = [];

        this.range = range;
        this.values = range.getValues();
        this.rowList = this.packageEntities();
    }

    /**
     * packageEntities
     * @access private
     * @returns {RowUnitList}
     */
    packageEntities() {
        let rowList = new RowUnitList();

        for (let row = 0; row < this.values.length; row++){
            
            /**@type {EntityUnit[]} */
            let entities = [];
            for (let column = 0; column < this.values[row].length; column++){
                entities[column] = new EntityUnit(this, this.values[row][column],
                    new CellPath(row, column));
            }
            rowList.add(new RowUnit(entities, row));
        }

        return rowList;
    }

    /**
     * addNewRow
     * @param  {string[]} values 
     */
    addNewRow(values) {

        //@ts-ignore
        if (values.length != this.rowList.get(0).entities.length)
            throw new Error(`The number of new row's columns is inconsistent with the actual (Need ${this.rowList.get(0).entities.length} but it is ${values.length})`);
        
        console.log(this.values);
        let emptyRow = this.rowList.getLastEmptyRow();
        if (emptyRow) {
            let num = 0;
            emptyRow.entities.forEach((entity) => {
                entity.value = values[num];
                num++;
            })
        } else {
            let newRange = this.range.offset(0, 0, this.range.getHeight() + 10);
            let newValues = newRange.getValues();
            let rowList = this.rowList;

            for (let row = this.range.getHeight(); row < newValues.length; row++){
                
                /**@type {EntityUnit[]} */
                let entities = [];
                for (let column = 0; column < newValues[row].length; column++){
                    entities[column] = new EntityUnit(this, newValues[row][column],
                        new CellPath(row, column));
                }
                rowList.add(new RowUnit(entities, row));
            }

            this.range = newRange;
            this.values = newValues;

            this.addNewRow(values);
        }
    }

    /**
     * addEditCell
     * @param {EntityUnit} entityUnit 
     */
    addEditCell(entityUnit) {
        this.editCells.push(entityUnit);
    }

    /**@deprecated */
    getEntities() {
        return this.rowList.getTwoDimensionalArray();
    }

    sortEmptyRowEntity() {
        this.rowList.sortEmpty();
        this.refresh();
    }

    /**@deprecated */
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
            this.values[cellPath.row][cellPath.column] = entityUnit.value;
        });

        this.range.setValues(this.values);
        this.editCells = [];
    }
}
