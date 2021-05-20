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
                logger.info(value + " checked!! is " + v8n().string().test(value));
                return v8n().string().test(value);
            }, true)
        );
    }

    run() {
        let logger = new FOSLogger("TestController");
        logger.info("Test Controller Run!!");
        logger.info(FOSRequire("config").config.get("sys.version"));
        logger.info("The para is " + this.parameterDefineMap.get("paraKey").object);
        return this.parameterDefineMap.get("paraKey").object;
    }

    static getName() {
        return "TestController";
    }

    static getDependencies() {
        return ["TestService:test1", "TestService:test2"]
    }
}

export { TestController };