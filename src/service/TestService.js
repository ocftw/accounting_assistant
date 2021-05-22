import FOSLogger from './LoggerService';

export default class {

    constructor() {
        this.logger = new FOSLogger("TestService");
        this.check = "TestService's this";

        let dependencyService = FOSRequire("DependencyService");
        let dependencytest3 = dependencyService.registeDependency("TestService:dependency3", this.testMethod3, this);
        let dependencytest2 = dependencyService.registeDependency("TestService:dependency2", this.testMethod2, this, dependencytest3);
        dependencyService.registeDependency("TestService:dependency1", this.testMethod, this, dependencytest2);
    }


    testMethod() {
        this.logger.info("TestService test dependency1 called");
    }

    testMethod2() {
        this.logger.info("TestService test dependency2 called   check_this=" + this.check);
    }

    testMethod3() {
        this.logger.info("TestService test dependency3 called");
    }
}