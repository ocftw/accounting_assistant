//@ts-check
import GetAllKeyValueOption from './GetAllKeyValueOption'
import KeyValueVersion from './KeyValueVersion';
import chunk from 'lodash/chunk'
import findIndex from 'lodash/findIndex'

export default class SheetUtil {

    /**
     * sheetIsEmpty
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet 
     */
    static sheetIsEmpty(sheet){
        return sheet.getDataRange().isBlank();
    }

    /**
     * getAllKeyValueVersion
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet 
     * @returns {?[KeyValueVersion]}
     */
    static getAllKeyValueVersion(sheet) {
        let values = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues();
        let versionList = chunk(values[0], 2);
        /** @type {[KeyValueVersion]} */
        let keyValueVersionList = null;

        for (let i = 0; i < versionList.length; i++){
            let version = versionList[i];

            if (version[0] !== "version") {
                throw new Error("The key-value version control is not used, or has a wrong data format. " +
                    "First key should be a string \"version\" but is " + version[0]);
            }

            if (version[1] === "") {
                throw new Error("The key-value version control is not used, or has a wrong data format. " +
                    "The version name cannot be empty");
            }

            let keyValueVersion = new KeyValueVersion(version[1], i * 2 + 1);
            if (keyValueVersionList === null) {
                keyValueVersionList = [keyValueVersion];
            } else {
                if (findIndex(keyValueVersionList, (value) => value.versionName === version[1]) !== -1) {
                    throw new Error("Duplicate version name found: " + version[1]);
                } else {
                    keyValueVersionList.push(keyValueVersion);
                }
            }
        }

        // for (let i = 0; i < versionList.length; i++){
        //     if (!(i % 2 === 0 && versionList[i] === "version")) {
        //         throw new Error("The key-value version control is not used, or has a wrong data format. " +
        //             "First key should be a string \"version\" but is " + versionList[i]);
        //     } else if (!(i % 2 === 1 && versionList[i] !== null)) {
        //         throw new Error("The key-value version control is not used, or has a wrong data format. " +
        //             "The " + i + "th value cannot be null");
        //     }
        // }

        // for (let i = 0; i < versionList.length; i + 2) {
        //     let keyValueVersion = new KeyValueVersion(versionList[i + 1], i);
        // }

        return keyValueVersionList;
    }

    /**
     * getAllKeyValue
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The Financial Operating System default load sheet name
     * @param {?[GetAllKeyValueOption]} options
     * @param {number} offset Number of starting column (key)
     * @returns {Map<string, string>}
     */
    static getAllKeyValue(sheet, options, offset=1){
        let values = sheet.getRange(2, offset, sheet.getLastRow() - 1, 2).getValues();
        let map = new Map();
        
        if (options instanceof Array) {
            values.forEach(element => {
                if (element[0] === "") return;
                options.forEach(option => {
                    if (option.key === null || element[0] === option.key) {
                        let optionReturn = option.callback(element[1], element[0], map);
                        if (optionReturn instanceof Map) {
                            map = new Map([...map, ...optionReturn]);
                        }
                    } else map.set(element[0], element[1]);
                })
            });
        } else {
            values.forEach(element => {
                map.set(element[0], element[1]);
            });
        }
        return map;
    }

    /**
     * safeInsertKeyValue
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet key-value format sheet
     * @param {string} key node
     * @param {string} value value
     * @param {boolean} overwriteExistingValue
     * @param {number} offset
     */
    static safeInsertKeyValue(sheet, key, value, overwriteExistingValue = false, offset = 1) {
        let values = sheet.getRange(2, offset, sheet.getLastRow() - 1, 2).getValues();
        let flag = false;
        
        values.some((array, index) => {
            if (array[0] === key && overwriteExistingValue) {
                sheet.getRange(index + 1, 1).setValue(value);
                flag = true;
                return true;
            } else if (array[0] === key && !overwriteExistingValue) {
                flag = true;
                return true;
            }
        })

        if (!flag) SheetUtil.insertKeyValue(sheet, key, value);
    }

    /**
     * insertKeyValue
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet key-value format sheet
     * @param {string} key node
     * @param {string} value value
     * @param {number} offset
     */
    static insertKeyValue(sheet, key, value, offset = 1) {
        sheet.getRange(sheet.getLastRow() + 1, offset, 1, 2).setValues([[key, value]]);
    }

    /**
     * prefixAndImportOptions
     * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet 
     * @returns {[GetAllKeyValueOption]}
     */
    static prefixAndImportOptions(spreadsheet) {
        return [
            new GetAllKeyValueOption("import", (importValue, importKey, mapInNow) => {
                let importPrefixFlag = false;
                let importPrefix;
                if (mapInNow.has(importValue + ".prefix")) {
                    let rawMap = SheetUtil.getAllKeyValue(spreadsheet.getSheetByName(importValue), null);
                    let prefix = mapInNow.get(importValue + ".prefix");
                    let returnMap = new Map();
                    rawMap.forEach((value, key) => {
                        returnMap.set(prefix + key, value);
                    })
                    return returnMap;
                } else return SheetUtil.getAllKeyValue(spreadsheet.getSheetByName(importValue), [
                    new GetAllKeyValueOption(null, (importValue, importKey, mapInNow) => {
                        if (importKey === "prefix") {
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