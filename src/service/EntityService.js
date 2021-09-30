//@ts-check
import AbstractService from './AbstractService';
import EntitySource from './entity/EntitySource';
import KeyValueEntitySource from './entity/KeyValueEntitySource';

export default class extends AbstractService {

    static getName() {
        return "EntityService";
    }

    /**
     * getEntitySource
     * @param {string} spreadsheetId 
     * @param {string} sheetName 
     * @returns {EntitySource}
     */
    getEntitySource(spreadsheetId, sheetName) {
        let sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
        let range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
        return new EntitySource(range);
    }

    /**
     * getEntitySource
     * @param {string} spreadsheetId 
     * @param {string} sheetName 
     * @returns {KeyValueEntitySource}
     */
    getKeyValueEntity(spreadsheetId, sheetName, autoImport = false) {
        let spreadsheet = SpreadsheetApp.openById(spreadsheetId);
        return new KeyValueEntitySource(spreadsheet, sheetName, autoImport);    
    }
}