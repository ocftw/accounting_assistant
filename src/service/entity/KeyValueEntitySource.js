//@ts-check

import EntityKeyValueWrapper from "./EntityKeyValueWrapper";
import SheetUtil from "../../util/SheetUtil";
import EntitySource from "./EntitySource";

export default class {

    /**
     * constructor
     * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet 
     * @param {string} defaultSheet;
     */
    constructor(spreadsheet, defaultSheet) {
        this.spreadsheet = spreadsheet;
        this.defaultSheet = spreadsheet.getSheetByName(defaultSheet);
        this.autoImport = false;

        /** @type {EntitySource[]} */
        let entitySourceList = [];
        let options;

        let range = this.defaultSheet.getRange(2, 1, this.defaultSheet.getLastRow() - 1, 2);
        let defaultEntitySource = new EntitySource(range);
        let entities = defaultEntitySource.getEntities();
        entitySourceList.push(defaultEntitySource);

        if (this.autoImport) {
            
        }

        this.entityKeyValueMap = SheetUtil.getEntityKeyValue(entities, options);
        this.entitySourceList = entitySourceList;
    }

    turnOnAutoImport() {
        this.autoImport = true;
    }

    put(key, value) {
        
    }

    /**
     * get
     * @param {string} key 
     */
    get(key) {
        return this.entityKeyValueMap.get(key);
    }

    remove(key) {
        
    }

    refresh() {
        this.entitySourceList.forEach((value) => {
            value.refresh();
        })
    }
}