import v8n from 'v8n';
import ParameterDefine from '../util/ParameterDefine'
import FOSLogger from '../service/LoggerService';
import { AbstractScript } from './AbstractScript';

class TestScript extends AbstractScript {
    constructor() {
        super();
        this.parameterDefineMap = new Map();
        this.parameterDefineMap.set("paraKey",
            new ParameterDefine((value, logger) => {
                logger.info("parameter \"" + value + "\" verified, result is " + v8n().string().test(value));
                return v8n().string().test(value);
            }, true)
        );
    }

    run() {
        let logger = new FOSLogger("TestScript");
        logger.info("Test Script Run!!");
        logger.info("The para is " + this.parameterDefineMap.get("paraKey").object);
        
        let parameterMap = new Map();
        parameterMap.set("paraKey", this.parameterDefineMap.get("paraKey").object);
        logger.info("Test Script call TestController");
        return this.runController("TestController", parameterMap);
    }

    static getName() {
        return "TestScript";
    }
}

export { TestScript };