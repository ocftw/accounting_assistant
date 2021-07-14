import FOSLogger from '../service/LoggerService';

export default class {
    constructor(loggerService) {
        global.FOSSelfs.requireService = this;
        this.logger = loggerService.buildLogger("RequireService");

        this.component = new Map();
        this.addComponent("config", global.FOSValues.FOSConfig);
    }

    addComponent(id, object) {
        let self = FOSSelfs.requireService;

        if (self.component.get(id) !== undefined) {
            self.logger.error("The id \"" + id + "\" is already in requires map");
            throw new Error("The id \"" + id + "\" is already in requires map");
        } else self.component.set(id, object);
    }

    require(id) {
        let self = FOSSelfs.requireService;

        let requireObject = self.component.get(id);
        if (requireObject === undefined) {
            self.logger.error("Require id not found: " + id);
            throw new Error("Require id not found: " + id);
        }
        return requireObject;
    }
}
