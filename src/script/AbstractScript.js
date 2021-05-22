//@ts-check
import ControllerService from '../service/ControllerService'

class AbstractScript {
    constructor() {
        if (this.constructor == AbstractScript) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        /**@type {ControllerService} controllerService */
        this.controllerService = (/**@type {ControllerService} controllerService */FOSRequire("ControllerService"));
    }

    run() {
        throw new Error("Method 'run()' must be implemented.");
    }

    /**
     * 
     * @param {string} id 
     * @param {?Map} parameterMap 
     */
    runController(id, parameterMap) {
        this.controllerService.getControllerExecutor(id, parameterMap).execute();
    }

    /**
     * @returns {string}
     */
    static getName() {
        throw new Error("Method 'getName()' must be implemented.");
    }

    /**
     * @returns {string}
     */
    static getType() {
        return "Script";
    }
}

export {AbstractScript}