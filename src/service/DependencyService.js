import DependencyUnit from './dependency/DependencyUnit'

export default class {
    constructor() {
        global.FOSSelfs.dependencyService = this;
        this.logger = FOSRequire("LoggerService").buildLogger("DependencyService");

        this.dependencys = new Set();
    }

    registeDependency(id, method, dependSelf, parent) {
        let self = FOSSelfs.dependencyService;
        let dependency = new DependencyUnit(id, method, dependSelf, parent);

        if (self.dependencys.has(id)) {
            self.logger.error("The id \"" + id + "\" is already in dependency map");
            throw new Error("The id \"" + id + "\" is already in dependency map");
        } else {
            self.dependencys.add(dependency);
            self.logger.debug("Add id \"" + id + "\" to dependency");
            return dependency;
        } 
    }

    requireDependencies(idArray) {
        let self = FOSSelfs.dependencyService;

        idArray.forEach(id => {
            self.requireDependency(id);
        })
    }

    requireDependency(id) {
        let self = FOSSelfs.dependencyService;
        let flag = false;
        
        self.dependencys.forEach(dependency => {
            if (dependency.id === id) {
                if (!dependency.isUsed()) {
                    if (dependency.parent !== undefined) {
                        self.requireDependency(dependency.parent.id);
                    }
                    Reflect.apply(dependency.method, dependency.self, []);
                    dependency.setUsed();
                }
                flag = true;
            }
        });

        if (!flag) {
            self.logger.error("Unable to find dependency with \"" + id + "\"");
            throw new Error("Unable to find dependency with \"" + id + "\"");
        }
    }
}