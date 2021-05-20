import DependencyService from './DependencyService';
import FOSLogger from './LoggerService';

export default class {

    constructor() {
        this.logger = new FOSLogger("TestService");
        this.abc = "testThis";

        let dependencyService = FOSRequire("DependencyService");
        let dependencytest3 = dependencyService.registeDependency("TestService:test3", this.testMethod3, this);
        let dependencytest2 = dependencyService.registeDependency("TestService:test2", this.testMethod2, this, dependencytest3);
        dependencyService.registeDependency("TestService:test1", this.testMethod, this, dependencytest2);
    }


    testMethod() {
        this.logger.info("TestService testMethod");
    }

    testMethod2() {
        this.logger.info("TestService testMethod2   abc=" + this.abc);
    }

    testMethod3() {
        this.logger.info("TestService testMethod3");
    }
}