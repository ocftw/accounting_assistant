//@ts-check
import AbstractService from './AbstractService';

export default class extends AbstractService{

    static getName() {
        return "TestService";
    }

    constructor() {
        super();
        // this.logger = new FOSLogger("TestService");
        this.check = "TestService's this";

        let dependencytest3 = this.dependencyService.registeDependency("TestService:dependency3", this.testMethod3, this);
        let dependencytest2 = this.dependencyService.registeDependency("TestService:dependency2", this.testMethod2, this, dependencytest3);
        this.dependencyService.registeDependency("TestService:dependency1", this.testMethod, this, dependencytest2);
    }

    testMethod() {
        this.logger.info("TestService test dependency1 called");
        this.logger.info(this.getServiceConfig("testKey"));
    }

    testMethod2() {
        this.logger.info("TestService test dependency2 called   check_this=" + this.check);
    }

    testMethod3() {
        this.logger.info("TestService test dependency3 called");
    }
}