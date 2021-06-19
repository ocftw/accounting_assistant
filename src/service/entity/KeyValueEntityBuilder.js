//@ts-check

import SheetUtil from "../../util/SheetUtil";
import EntitySource from "./EntitySource";
import KeyValueEntitySource from "./KeyValueEntitySource";

export default class KeyValueEntityBuilder{

    /**
     * constructor
     * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet 
     * @param {string} defaultSheet;
     */
    constructor(spreadsheet, defaultSheet) {
        this.spreadsheet = spreadsheet;
        this.defaultSheet = spreadsheet.getSheetByName(defaultSheet);
        this.autoImport = false;
    }

    /**
     * setImport
     * @param {boolean} autoImport 
     * @returns {KeyValueEntityBuilder}
     */
    turnOnAutoImport(autoImport) {
        this.autoImport = autoImport;
        return this;
    }

    /**
     * @returns {KeyValueEntitySource}
     */
    build() {
        /** @type {EntitySource[]} */
        let entitySourceList = [];
        let options;

        let range = this.defaultSheet.getRange(2, 1, this.defaultSheet.getLastRow() - 1, 2);
        let defaultEntitySource = new EntitySource(range);
        let entities = defaultEntitySource.getEntities();
        entitySourceList.push(defaultEntitySource);

        if (this.autoImport) {
            
        }

        let entityKeyValueMap = SheetUtil.getEntityKeyValue(entities, options);
        return new KeyValueEntitySource(entityKeyValueMap, entitySourceList);
    }
}