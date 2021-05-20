import v8n from 'v8n';
import FOSLogger from './service/LoggerService'
import ControllerService from './service/ControllerService'

import './Initialize';
import './BaseDependency';

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
    controller.run();
}

global.testConfig = () => {
    console.time("[init] read config");
    Logger.log(FOSRequire("config").secret.admin.name);
    console.timeEnd("[init] read config");
}