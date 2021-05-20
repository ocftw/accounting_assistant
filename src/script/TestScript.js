import v8n from 'v8n';
import ParameterDefine from '../util/ParameterDefine'
import FOSLogger from '../service/LoggerService';
import ControllerService from '../service/ControllerService';
import { AbstractScript } from './AbstractScript';

class TestScript extends AbstractScript {
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
        let logger = new FOSLogger("TestScript");
        logger.info("Test Script Run!!");
        logger.info("The para is " + this.parameterDefineMap.get("paraKey").object);
        

        let parameterMap = new Map();
        parameterMap.set("paraKey", this.parameterDefineMap.get("paraKey").object);
        return this.controllerService.getControllerExecutor("TestController", parameterMap).execute();;
    }

    static getName() {
        return "TestScript";
    }
}

export { TestScript };