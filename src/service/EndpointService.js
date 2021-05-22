//@ts-check

import ControllerService from "./ControllerService";
import ScriptService from "./ScriptService";
import FOSLogger from './LoggerService';
import Config from '../Config';

export default class {
    constructor() {
        /**@type {ControllerService} controllerService */
        this.controllerService = (/**@type {ControllerService} */ FOSRequire("ControllerService"));
        /**@type {ScriptService} scriptService */
        this.scriptService = (/**@type {ScriptService} */ FOSRequire("ScriptService"));
        this.logger = new FOSLogger("EndpointService");
    }

    /**
     * 
     * @param {string} id script or controller id
     * @param {Map} parameterMap parameters prepared to be placed in the controller
     * @param {string} source endpoint source name
     */
    call(id, parameterMap, source) {
        /**@type {Config} */
        let config = (/**@type {Config} */FOSRequire("config"));
        config.session.source = source;
        
        if (id.startsWith("script:")) {
            id = id.substring(7);
            if (this.scriptService.hasScript(id)) {
                this.logger.debug("Endpoint called the script: " + id);
                if (typeof parameterMap !== "undefined") this.logger.debug("With parameters: " + [...parameterMap.entries()]);
                return this.scriptService.getScriptExecutor(id, parameterMap).execute();
            }
        } else if (id.startsWith("controller:")) {
            id = id.substring(11);
            if (this.controllerService.hasController(id)) {
                this.logger.debug("Endpoint called the controller: " + id);
                if (typeof parameterMap !== "undefined") this.logger.debug("With parameters" + [...parameterMap.entries()]);
                return this.controllerService.getControllerExecutor(id, parameterMap).execute();
            }
        }
    }
}