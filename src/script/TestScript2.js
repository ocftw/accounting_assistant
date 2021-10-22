const { AbstractScript, Script } = require("./AbstractScript");

@Script
class TestScript2 extends AbstractScript {
    constructor() {
        super();
        this.logger = FOSRequire("LoggerService").buildLogger("TestScript");
    }

    run(params) {
        return ContentService.createTextOutput(JSON.stringify("ok " + params));
    }

    static getName() {
        return "TestScript2";
    }
}

export { TestScript2 };