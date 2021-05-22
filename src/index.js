import v8n from 'v8n';
import FOSLogger from './service/LoggerService'

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
    let parameterMap = new Map();
    parameterMap.set("paraKey", "paraValue!!!")

    let controllerExecutor = FOSValues.controllerService.getControllerExecutor(controller, parameterMap);
    logger.info(controllerExecutor.execute());
}

global.testScript = () => {
    logger.info("testScript endpoint called");
    let parameterMap = new Map();
    parameterMap.set("paraKey", "scriptValue!!!")

    logger.info(FOSRequire("ScriptService").getScriptExecutor("TestScript", parameterMap).execute());
}

global.testConfig = () => {
    console.time("[init] read config");
    Logger.log(FOSRequire("config").secret.admin.name);
    console.timeEnd("[init] read config");
}