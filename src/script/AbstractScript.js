//@ts-check
import ControllerService from '../service/ControllerService';
import ScriptService from '../service/ScriptService'

/**
 * Script
 * @param {typeof AbstractScript} target 
 */
function Script(target) {
    /**@type {ScriptService} */
    let scriptService = (FOSRequire("ScriptService"));
    scriptService.addScript(target.getName(), target);
}

class AbstractScript {
    constructor() {
        if (this.constructor == AbstractScript) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    run() {
        throw new Error("Method 'run()' must be implemented.");
    }

    /**
     * runController
     * @param {string} id 
     * @param {?Map} parameterMap 
     */
    runController(id, parameterMap) {
        /**@type {ControllerService} */
        let controllerService = (FOSRequire("ControllerService"));
        return controllerService.getControllerExecutor(id, parameterMap).execute();
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

export {AbstractScript, Script}