//@ts-check

import GetEntityKeyValueOption from "../../util/GetEntityKeyValueOption";
import SheetUtil from "../../util/SheetUtil";
import EntitySource from "./EntitySource";

export default class {

    /**
     * constructor
     * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet 
     * @param {string} defaultSheet
     * @param {boolean} autoImport
     */
    constructor(spreadsheet, defaultSheet, autoImport = false) {
        this.spreadsheet = spreadsheet;
        this.defaultSheet = spreadsheet.getSheetByName(defaultSheet);
        this.autoImport = false;

        /** @type {EntitySource[]} */
        this.entitySourceList = [];
        let options = null;

        let range = this.defaultSheet.getRange(2, 1, this.defaultSheet.getLastRow(), 2);
        let defaultEntitySource = new EntitySource(range);
        let entities = defaultEntitySource.getEntities();
        this.entitySourceList.push(defaultEntitySource);

        if (autoImport) {
            options = this.prefixAndImportOptions(spreadsheet)
        }

        this.entityKeyValueMap = SheetUtil.getEntityKeyValue(entities, options);

        this.size = this.entityKeyValueMap.size;
        this.has = this.entityKeyValueMap.has;
    }

    /**
     * getKeyValueEntities
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet 
     */
    getKeyValueEntities(sheet) {
        let range = sheet.getRange(2, 1, this.defaultSheet.getLastRow() - 1, 2);
        let entitySource = new EntitySource(range);
        this.entitySourceList.push(entitySource);

        return entitySource.getEntities();
    }

    set(key, value) {
        
    }

    /**
     * get
     * @param {string} key 
     */
    get(key) {
        return this.entityKeyValueMap.get(key);
    }

    /**
     * delete
     * @param {string} key 
     */
    delete(key) {
        //TODO
    }

    clear() {
        //TODO
    }

    refresh() {
        this.entitySourceList.forEach((value) => {
            value.refresh();
        })
    }

    /**
     * prefixAndImportOptions
     * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet
     * @returns {[GetEntityKeyValueOption]}
     */
    prefixAndImportOptions(spreadsheet) {
        return [
            new GetEntityKeyValueOption("import", (importValue, importKey, mapInNow) => {
                let importPrefixFlag = false;
                let importPrefix;
                if (mapInNow.has(importValue + ".prefix")) {
                    let rawMap = SheetUtil.getEntityKeyValue(this.getKeyValueEntities(spreadsheet.getSheetByName(importValue.toString())), null);
                    let prefix = mapInNow.get(importValue + ".prefix");
                    let returnMap = new Map();
                    rawMap.forEach((value, key) => {
                        returnMap.set(prefix + key, value);
                    });
                    return returnMap;
                } else return SheetUtil.getEntityKeyValue(this.getKeyValueEntities(spreadsheet.getSheetByName(importValue.toString())), [
                    new GetEntityKeyValueOption(null, (importValue, importKey, mapInNow) => {
                        if (importKey.toString() == "prefix") {
                            importPrefixFlag = true;
                            importPrefix = importValue;
                            return null;
                        } else if (importPrefixFlag) {
                            let returnMap = new Map();
                            returnMap.set(importPrefix + importKey, importValue);
                            return returnMap;
                        } else {
                            let returnMap = new Map();
                            returnMap.set(importKey, importValue);
                            return returnMap;
                        }
                    })
                ]);
            })
        ]
    }
}