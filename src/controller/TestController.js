import { AbstractController } from './AbstractController';
import v8n from 'v8n';
import ParameterDefine from '../util/ParameterDefine'
import FOSLogger from '../service/LoggerService';

class TestController extends AbstractController {

    constructor() {
        super();
        this.parameterDefineMap = new Map();
        this.parameterDefineMap.set("paraKey",
            new ParameterDefine((value, logger) => {
                return v8n().string().test(value);
            }, true)
        );
    }

    run() {
        let logger = FOSRequire("LoggerService").buildLogger("TestController");
        logger.info("Test Controller Run");
        logger.info("The para is " + this.parameterDefineMap.get("paraKey").object);
        return this.parameterDefineMap.get("paraKey").object + " controller return";
    }

    static getName() {
        return "TestController";
    }

    static getDependencies() {
        return ["TestService:dependency1", "TestService:dependency2"]
    }
}

export { TestController };