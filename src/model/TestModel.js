//@ts-check

const { AbstractModel, Model } = require("../service/model/AbstractModel");

@Model
class TestModel extends AbstractModel {

    constructor() {
        super();

        /**@type {string} */
        this.name = null;
        this.num = null;
        this.date = null;
    }

    static getName() {
        return "TestModel";
    }

    static getVersion() {
        return 1;
    }
}

export {TestModel}