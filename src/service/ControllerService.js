import {TestController} from '../controller/TestController'

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
}