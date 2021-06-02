//@ts-check
import AbstractService from './AbstractService';
import { TestScript } from '../script/TestScript';
import ControllerExecutor from './controller/ControllerExecutor';

export default class extends AbstractService{

    static getName() {
        return "ScriptService";
    }

    constructor() {
        super();
        this.controllers = new Map();
        this.addScript(TestScript.getName(), TestScript);
    }

    addScript(id, object) {
        this.controllers.set(id, object);
    }

    hasScript(id) {
        return this.controllers.has(id);
    }

    getScript(id) {
        return this.controllers.get(id);
    }

    getScriptExecutor(id, parameterMap) {
        let controllerClass = this.getScript(id);
        return new ControllerExecutor(controllerClass, parameterMap);
    }
}