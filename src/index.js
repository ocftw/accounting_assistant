import v8n from 'v8n';
import FOSLogger from './service/LoggerService'

import './Initialize';
import './BaseDependency';

import ControllerExecutor from './service/controller/ControllerExecutor'

let logger = new FOSLogger("main");

global.testV8n = () => Logger.log(v8n().number().test("teasd"));

global.testLogger = () => {
    logger.info("Test log");
    logger.error("Test log2");
    logger.info("Test log3");
}

global.testController = () => {

    let controllerClass = FOSValues.controllerService.getController("TestController");
    let controller = new controllerClass();

    let parameterMap = new Map();
    parameterMap.set("paraKey", "paraValue!!!")

    let controllerExecutor = new ControllerExecutor(controller, parameterMap);
    logger.info(controllerExecutor.execute());

    // controller.run();
}

global.testConfig = () => {
    console.time("[init] read config");
    Logger.log(FOSRequire("config").secret.admin.name);
    console.timeEnd("[init] read config");
}