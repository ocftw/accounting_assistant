//@ts-check

const { AbstractModel, Model } = require("./AbstractModel");

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
}

export {TestModel}