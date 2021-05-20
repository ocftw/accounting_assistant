class AbstractScript {
    constructor() {
        if (this.constructor == AbstractScript) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.controllerService = FOSRequire("ControllerService");
    }

    run() {
        throw new Error("Method 'run()' must be implemented.");
    }

    static getName() {
        throw new Error("Method 'getName()' must be implemented.");
    }
}

export {AbstractScript}