//@ts-check
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