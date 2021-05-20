import FOSLogger from '../LoggerService'

export default class {
    constructor(controller, parameterMap) {
        this.controller = controller;
        this.parameterMap = parameterMap;
        this.logger = new FOSLogger("ControllerExecutor");
    }

    execute() {
        this.verifyAndPutParameters();
        return this.controller.run();
    }

    verifyAndPutParameters() {
        if (this.controller.parameterDefineMap === undefined) return;

        for (let [id, parameterDefine] of this.controller.parameterDefineMap.entries()) {
            if ((!this.parameterMap.has(id) || this.parameterMap.get(id) === undefined) && parameterDefine.isRequire) {
                this.logger.error("Missing controller parameters: " + id);
                throw new Error("Missing controller parameters: " + id);
            }

            if (!parameterDefine.checkFunction(this.parameterMap.get(id), this.logger)) {
                this.logger.error("Failed to verify controller parameters: " + id);
                throw new Error("Failed to verify controller parameters: " + id);
            }

            parameterDefine.object = this.parameterMap.get(id);
        }
    }
}