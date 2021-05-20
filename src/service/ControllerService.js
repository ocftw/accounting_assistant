import { TestController } from '../controller/TestController'
import ControllerExecutor from './controller/ControllerExecutor'

export default class {
    constructor() {
        this.controllers = new Map();
        this.addController(TestController.getName(), TestController);
    }

    addController(id, object) {
        this.controllers.set(id, object);
    }

    getController(id) {
        return this.controllers.get(id);
    }

    getControllerExecutor(id, parameterMap) {
        let controllerClass = this.getController(id);
        let controller = new controllerClass();
        return new ControllerExecutor(controller, parameterMap);
    }
}