//@ts-check

import { AbstractModel } from "../../model/AbstractModel";
import ColumnDefine from "../spreadsheet/ColumnDefine";
import SheetDefine from "../spreadsheet/SheetDefine";
import EntitySource from "./EntitySource";
import EntityUnit from "./EntityUnit";

export default class extends EntitySource{
    //  * @param {string} type object type
    //  * @param {?number} version object version
    
    /**
     * @param {typeof AbstractModel} modelClass
     * @param {GoogleAppsScript.Spreadsheet.Range} range
     * @param {SheetDefine} sheetDefine
     */
    constructor(modelClass, range, sheetDefine) {
        super(range);
        
        // this.type = type;
        // this.version = version;
        this.modelClass = modelClass;

        /** @type {SheetDefine} */
        this.sheetDefine = sheetDefine;

        this.columns = this.translateColumn(this.sheetDefine.columnRow, this.sheetDefine.columnDefines);
        this.models = this.packageModel(this.modelClass, this.sheetDefine.dataStartRow, this.columns);
        this.proxiedModels = this.packageProxies(this.models);
    }

    /**
     * translateColumn
     * @param {number} columnRow 
     * @param {ColumnDefine[]} columnDefines 
     * @returns {string[]} 
     */
    translateColumn(columnRow, columnDefines) {
        /** @type {string[]} */
        let columns = [];
        let index = 0;
        
        this.getEntities()[columnRow].forEach((entityValue) => {
            let flag = false;
            columnDefines.some((columnDefineValue) => {
                if (entityValue.value === columnDefineValue.columnName) {
                    columns[index] = columnDefineValue.fieldName;
                    flag = true;
                    return true;
                }
            })

            if (!flag) columns[index] = null;
            index++;
        })

        return columns;
    }

    /**
     * packageModel
     * @param {typeof AbstractModel} modelClass
     * @param {number} dataStartRow 
     * @param {string[]} columns
     * @returns {AbstractModel[]}
     */
    packageModel(modelClass, dataStartRow, columns) {
        /** @type {AbstractModel[]} */
        let models = [];

        let rowEntities = this.getEntities();
        for (let i = dataStartRow; i < rowEntities.length; i++){
            let model = new modelClass();
            let entities = rowEntities[i];
            for (let columnIndex = 0; columnIndex < columns.length; columnIndex++){
                let fieldName = columns[columnIndex];
                if (fieldName === null) continue;

                if (model[fieldName] !== undefined) {
                    model[fieldName] = entities[columnIndex];
                } else {
                    // TODO Need security alert
                }
            }
            models.push(model);
        }

        return models;
    }

    /**
     * packageProxies
     * @param {AbstractModel[]} models 
     * @returns {AbstractModel[]}
     */
    packageProxies(models) {
        /** @type {AbstractModel[]} */
        let proxiedModels = [];
        for (let i = 0; i < models.length; i++) proxiedModels.push(this.packageProxy(models[i]));
        return proxiedModels;
    }

    /** 
     * packageProxy
     * @param {AbstractModel} model
     * @returns {AbstractModel}
     */
    packageProxy(model) {
        let handler = {
            set: function (obj, prop, value) {
                if (obj[prop] instanceof EntityUnit) {
                    obj[prop].value = value;
                } else {
                    throw new Error("The entityUnit named " + prop + " not found");
                }

                return true;
            },

            get: function (obj, prop) {
                if (obj[prop] instanceof EntityUnit) {
                    return obj[prop].value;
                }
            }
        };
        
        return new Proxy(model, handler);
    }

    /**
     * @returns {AbstractModel[]}
     */
    getModels() {
        return this.proxiedModels;
    }
}