//@ts-check

import GetAllKeyValueOption from './util/GetAllKeyValueOption';
import sheetUtil from './util/SheetUtil'

const secret = {
    admin: {
        name: "小知",
        slack: {
            user_id: "U01DEHWPU7J"
        }
    },
    config:{
        sheet: "1IDitf2M5YL_HEaw-GCSuYNalAIOqomRcaVrjtAmTKi4"
    }
}

const configSpreadsheet = SpreadsheetApp.openById(secret.config.sheet);
const config = sheetUtil.getAllKeyValue(configSpreadsheet.getSheetByName("global"),[
    new GetAllKeyValueOption("import", (importValue, importKey, mapInNow) => {
        let importPrefixFlag = false;
        let importPrefix;
        if (mapInNow.has(importValue + ".prefix")) {
            let rawMap = sheetUtil.getAllKeyValue(configSpreadsheet.getSheetByName(importValue), null);
            let prefix = mapInNow.get(importValue + ".prefix");
            let returnMap = new Map();
            rawMap.forEach((value, key) => {
                returnMap.set(prefix + key, value);
            })
            return returnMap;
        } else return sheetUtil.getAllKeyValue(configSpreadsheet.getSheetByName(importValue), [
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
    })]);

export default {
    secret: secret,
    config: config
}