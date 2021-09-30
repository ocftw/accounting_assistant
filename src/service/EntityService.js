//@ts-check
import { AbstractModel } from './model/AbstractModel';
import AbstractService from './AbstractService';
import EntitySource from './entity/EntitySource';
import KeyValueEntitySource from './entity/KeyValueEntitySource';
import ModelDefine from './model/ModelDefine';

export default class extends AbstractService {

    constructor() {
        super();

        /**@type {Map<string, ModelDefine[]>} */
        this.modelDefineMap = new Map();
    }

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

    /**
     * addModel
     * @param {typeof AbstractModel} model 
     */
    addModel(model) {
        if (!this.modelDefineMap.has(model.getName()))
            this.modelDefineMap.set(model.getName(), []);
        
        this.modelDefineMap.get(model.getName())[model.getVersion()] =
            new ModelDefine(model.getName(), model.getVersion(), model);
    }

    /**
     * getModel
     * @param {string} name 
     * @param {number} version 
     * @returns {typeof AbstractModel|false}
     */
    getModel(name, version) {
        let modelDefineArray = this.modelDefineMap.get(name);
        if (modelDefineArray[version] !== undefined) {
            return modelDefineArray[version].model;
        } else return false;
    }
}