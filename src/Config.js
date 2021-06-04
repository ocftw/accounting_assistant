//@ts-check
import { customAlphabet } from 'nanoid/non-secure'
import SheetUtil from './util/SheetUtil';
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

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 5);
const session = {
    source: "unknow",
    session: nanoid(),
}

const configSpreadsheet = SpreadsheetApp.openById(secret.config.sheet);
const config = sheetUtil.getAllKeyValue(configSpreadsheet.getSheetByName("global"),
    sheetUtil.prefixAndImportOptions(configSpreadsheet));

/**
 * getLocalConfig
 * @param {string} name service name
 */
const getLocalConfig = (name) => {
    return (key) => {
        return config.get(name + "." + key);
    }
}

/**
 * hasLocalConfig
 * @param {string} name service name
 */
const hasLocalConfig = (name) => {
    return (key) => {
        return config.has(name + "." + key);
    }
}

const createConfig = () => {
    return (key, value) => {
        let sheet = configSpreadsheet.getSheetByName("global");
        if (!config.has(key)) SheetUtil.insertKeyValue(sheet, key, value);
    }
}

/**
 * createLocalConfig
 * @param {string} name service name
 */
const createLocalConfig = (name) => {
    return (key, value) => {
        if (configSpreadsheet.getSheetByName(name) != null) {
            let sheet = configSpreadsheet.getSheetByName(name);
            if (!config.has(key)) SheetUtil.insertKeyValue(sheet, key, value);
        } else {
            let sheet = configSpreadsheet.getSheetByName("global");
            if (!config.has(key)) SheetUtil.insertKeyValue(sheet, name + "." + key, value);
        }
    }
}

const updateConfig = () => {
    return (key, value) => {
        let sheet = configSpreadsheet.getSheetByName("global");
        SheetUtil.safeInsertKeyValue(sheet, key, value, true);
    }
}

/**
 * updateLocalConfig
 * @param {string} name service name
 */
const updateLocalConfig = (name) => {
    return (key, value) => {
        if (configSpreadsheet.getSheetByName(name) != null) {
            let sheet = configSpreadsheet.getSheetByName(name);
            SheetUtil.safeInsertKeyValue(sheet, key, value, true);
        } else {
            let sheet = configSpreadsheet.getSheetByName("global");
            SheetUtil.safeInsertKeyValue(sheet, name + "." + key, value, true);
        }
    }
}

export default {
    secret: secret,
    session: session,
    config: config,
    getLocalConfig: getLocalConfig,
    hasLocalConfig: hasLocalConfig,
    createConfig: createConfig,
    createLocalConfig: createLocalConfig,
    updateConfig: updateConfig,
    updateLocalConfig: updateLocalConfig,
}