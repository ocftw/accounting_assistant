import { TestScript } from '../script/TestScript';
import ControllerExecutor from './controller/ControllerExecutor';

export default class {
    constructor() {
        this.controllers = new Map();
        this.addScript(TestScript.getName(), TestScript);
    }

    addScript(id, object) {
        this.controllers.set(id, object);
    }

    getScript(id) {
        return this.controllers.get(id);
    }

    getScriptExecutor(id, parameterMap) {
        let controllerClass = this.getScript(id);
        return new ControllerExecutor(controllerClass, parameterMap);
    }
}