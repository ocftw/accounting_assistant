export default class {
    constructor(controllerClass, parameterMap) {
        let controller = new controllerClass();
        this.controllerClass = controllerClass;
        this.controller = controller;
        this.parameterMap = parameterMap;
        this.logger = FOSRequire("LoggerService").buildLogger("ControllerExecutor");
    }

    execute() {
        this.verifyAndPutParameters();
        if (this.controllerClass.getType() === "Controller") this.loadDependency();
        this.logger.info("Starting " + this.controllerClass.getType().toLowerCase() + " executor: " + this.controllerClass.getName());
        return this.controller.run(this.parameterMap);
    }

    verifyAndPutParameters() {
        if (this.controller.parameterDefineMap === undefined) return;
        else if (this.parameterMap === undefined || this.parameterMap === null) {
            this.logger.error("Missing controller parameters (no parameter)");
            throw new Error("Missing controller parameters (no parameter)");
        }

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

    loadDependency() {
        if (this.controllerClass.getDependencies() === "None") return;
        let requireService = FOSRequire("DependencyService");
        requireService.requireDependencies(this.controllerClass.getDependencies());
    }
}