import v8n from 'v8n';
import EntityUnit from '../service/entity/EntityUnit';
import FOSLogger from '../service/LoggerService';
import ConfigUtil from '../util/ConfigUtil';
import SheetUtil from '../util/SheetUtil';

import findKey from 'lodash/findKey'
import EntityKeyValueWrapper from '../service/entity/EntityKeyValueWrapper';

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

global.testDrive = () => {
    Logger.log(FOSRequire("DriveService").checkFolderAvailable("Repository"));
    Logger.log(FOSRequire("DriveService").checkFolderAvailable("Repository12345"));
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

global.testEntityUtilToString = () => {
    let entity = new EntityUnit(null, "test", null);
    let entityKey = new EntityUnit(null, "entityKey", null);
    let entityValue = new EntityUnit(null, "entityValue", null);
    let entityWrapper = new EntityKeyValueWrapper(entityKey, entityValue);
    let map = new Map();
    map.set("entityKey", entityWrapper);

    console.log(map.get("entityKey").toString());
    console.log(entity);
    console.log(entity + "12345");
    console.log(entity == "test");
    console.log(entity === "test");
}