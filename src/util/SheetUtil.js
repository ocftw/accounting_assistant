//@ts-check
import GetAllKeyValueOption from './GetAllKeyValueOption'

export default class SheetUtil {
    static sheetIsEmpty(sheet){
        return sheet.getDataRange().isBlank();
    }

    /**
     * getAllKeyValue
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The Financial Operating System default load sheet name
     * @param {?[GetAllKeyValueOption]} options
     * @returns {Map<string, string>}
     */
    static getAllKeyValue(sheet, options){
        let values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
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
     * @param {?boolean} overwriteExistingValue
     */
    static safeInsertKeyValue(sheet, key, value, overwriteExistingValue = false) {
        let values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
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
     */
    static insertKeyValue(sheet, key, value) {
        sheet.getRange(sheet.getLastRow() + 1, 1, 1, 2).setValues([[key, value]]);
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