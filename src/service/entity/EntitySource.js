//@ts-check

import EntityUnit from "./EntityUnit";

export default class {
    
    /**
     * @param {GoogleAppsScript.Spreadsheet.Range} range 
     * @param {[[string]]} values
     */
    constructor(range, values) {
        this.range = range;
        this.values = values;
        this.entities = this.packageEntities();
    }

    packageEntities() {
        for (let row = 0; row < this.values.length; row++){
            for (let column = 0; column < this.values[row].length; column++){
                
            }
        }
    }

    /**
     * addEditCell
     * @param {EntityUnit} entityUnit 
     */
    addEditCell(entityUnit) {
        
    }
}