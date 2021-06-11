import v8n from 'v8n';
import FOSLogger from '../service/LoggerService';
import ConfigUtil from '../util/ConfigUtil';
import SheetUtil from '../util/SheetUtil';

let logger = new FOSLogger("TestEndPoint");

global.testV8n = () => Logger.log(v8n().number().test("teasd"));

global.testLogger = () => {
    logger.info("Test log");
    logger.error("Test log2");
    logger.info("Test log3");
}

global.testController = () => {
    let parameterMap = new Map();
    parameterMap.set("paraKey", "paraValue!!!");

    let controllerExecutor = FOSValues.controllerService.getControllerExecutor(controller, parameterMap);
    logger.info(controllerExecutor.execute());
}

global.testScript = () => {
    logger.info("testScript endpoint called");
    let parameterMap = new Map();
    parameterMap.set("paraKey", "scriptValue!!!");

    logger.info(FOSRequire("ScriptService").getScriptExecutor("TestScript", parameterMap).execute());
}

global.testConfig = () => {
    console.time("[init] read config");
    Logger.log(FOSRequire("config").secret.admin.name);
    Logger.log([...FOSRequire("config").config.entries()]);
    Logger.log(ConfigUtil.getSecondClassArray("endpoint", FOSRequire("config").config));
    console.timeEnd("[init] read config");
}

global.testLocalConfig = () => {
    console.time("[init] read config");
    Logger.log([...FOSRequire("config").config.entries()]);
    let localConfig = FOSRequire("config").getLocalConfig("endpoint");
    Logger.log(localConfig("test"));
    console.timeEnd("[init] read config");
}

global.testEndpoint = () => {
    console.time("testEndpoint");
    let parameterMap = new Map();
    parameterMap.set("paraKey", "endpointValue");
    FOSRequire("EndpointService").call("script:TestScript", parameterMap, "testEndpoint");
    console.timeEnd("testEndpoint");
}

global.testVersionKeyValue = () => {
    console.time("testVersionKeyValue");
    let configSheet = FOSRequire("config").configSpreadsheet.getSheetByName("TestVersion");
    console.log(...SheetUtil.getAllKeyValueVersion(configSheet));
    console.timeEnd("testVersionKeyValue");
}