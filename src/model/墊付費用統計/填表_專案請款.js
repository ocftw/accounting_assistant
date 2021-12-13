//@ts-check

const { AbstractModel, Model } = require("../../service/model/AbstractModel");

@Model
class 專案請款 extends AbstractModel {

    constructor() {
        super();

        /**@type {string} */
        this.撥款日期 = null;
        /**@type {string} */
        this.項目 = null;
        /**@type {number} */
        this.金額 = null;
        /**@type {string} */
        this.單據 = null;
        /**@type {string} */
        this.填表人 = null;
        /**@type {string} */
        this.專案名稱 = null;
        /**@type {string} */
        this.分帳備註 = null;
        /**@type {string} */
        this.對應匯款清單 = null;
        /**@type {string} */
        this.其他備註 = null;
        /**@type {string} */
        this.核銷備註 = null;
        /**@type {string} */
        this.預支備註 = null;
    }

    static getName() {
        return "TestModel";
    }

    static getVersion() {
        return 1;
    }
}

export { 專案請款 }