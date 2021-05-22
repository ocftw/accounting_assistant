//@ts-check
import GetAllKeyValueOption from './GetAllKeyValueOption'

export default class {
    static sheetIsEmpty(sheet){
        return sheet.getDataRange().isBlank();
    }

    /**
     * 
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The Financial Operating System default load sheet name
     * @param {?[GetAllKeyValueOption]} options
     * @returns {Map<string, string>}
     */
    static getAllKeyValue(sheet, options){
        let values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
        let map = new Map();
        
        if (options instanceof Array) {
            values.forEach(element => {
                Logger.log(element);
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
                Logger.log(element);
                map.set(element[0], element[1]);
            });        
        }
        return map;
    }
}