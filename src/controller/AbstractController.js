import ControllerService from "../service/ControllerService";
import Logger from "../service/logger/Logger";

/**
 * Controller
 * @param {typeof AbstractController} target 
 */
function Controller(target) {
    /**@type {ControllerService} */
    let controllerService = (FOSRequire("ControllerService"));
    controllerService.addController(target.getName(), target);
}


class AbstractController {
    constructor() {
        if (this.constructor == AbstractController) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    run() {
        throw new Error("Method 'run()' must be implemented.");
    }

    /**
     * @returns {Logger}
     */
    getLogger() {
        FOSRequire("LoggerService").buildLogger(this.constructor.getName());
    }

    /**
     * @returns {string}
     */
    static getName() {
        throw new Error("Method 'getName()' must be implemented.");
    }

    /**
     * @returns {string[]}
     */
    static getDependencies() {
        return "None";
    }

    /**
     * @returns {string}
     */
    static getType() {
        return "Controller";
    }
}

export { AbstractController, Controller }