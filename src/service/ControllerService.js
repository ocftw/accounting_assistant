//@ts-check
import { TestController } from '../controller/TestController'
import AbstractService from './AbstractService';
import ControllerExecutor from './controller/ControllerExecutor'

export default class extends AbstractService{

    static getName() {
        return "ControllerService";
    }

    constructor() {
        super();
        this.controllers = new Map();
        this.addController(TestController.getName(), TestController);
    }

    addController(id, object) {
        this.controllers.set(id, object);
    }

    hasController(id) {
        return this.controllers.has(id);
    }

    getController(id) {
        return this.controllers.get(id);
    }

    getControllerExecutor(id, parameterMap) {
        let controllerClass = this.getController(id);
        return new ControllerExecutor(controllerClass, parameterMap);
    }
}