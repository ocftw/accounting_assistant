//@ts-check

import EntitySource from "./EntitySource";

export default class extends EntitySource{
    
    /**
     * @param {GoogleAppsScript.Spreadsheet.Range} range 
     */
    constructor(range) {        
        super(range);
        
    }


}