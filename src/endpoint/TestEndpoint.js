import v8n from 'v8n';
import EntityUnit from '../service/entity/EntityUnit';
import FOSLogger from '../service/LoggerService';
import ConfigUtil from '../util/ConfigUtil';
import SheetUtil from '../util/SheetUtil';

import findKey from 'lodash/findKey'
import EntityKeyValueWrapper from '../service/entity/EntityKeyValueWrapper';
import EntitySource from '../service/entity/EntitySource';
import KeyValueEntityBuilder from '../service/entity/KeyValueEntityBuilder';

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

global.testEntitySource = () => {
    let sheet = SpreadsheetApp.openById(FOSRequire("config").secret.config.sheet);
    let range = sheet.getSheetByName("global").getRange(2, 1, 6, 2);
    let entitySource = new EntitySource(range);
    entitySource.getEntities().forEach((values) => {
        values.forEach((value) => {
            console.log(value.value);
            if (value.value == "TestService") value.value = "TestService2333";
        })
    })

    entitySource.refresh();
}

global.testGetEntityKeyValue = () => {
    let spreadsheet = SpreadsheetApp.openById(FOSRequire("config").secret.config.sheet);
    let range = spreadsheet.getSheetByName("global").getRange(2, 1, 6, 2);
    let entities = new EntitySource(range).getEntities();

    let keyValueMap = SheetUtil.getEntityKeyValue(entities);
    console.log(keyValueMap.get("sys.env.name"));
}

global.testKeyValueEntityBuilder = () => {
    let spreadsheet = SpreadsheetApp.openById(FOSRequire("config").secret.config.sheet);
    let keyValueEntitySource = new KeyValueEntityBuilder(spreadsheet, "global").build();
    console.log(keyValueEntitySource.get("sys.env.name"));
}

global.testEntitySourceRemove = () => {
    let sheet = SpreadsheetApp.openById("1FvCK_6bXR1WivQ-cjPgTwKnIto4MdIFSV1uxxNb0f70");
    let range = sheet.getSheetByName("TestKeyValue").getRange(2, 1, 6, 2);
    let entitySource = new EntitySource(range);
    entitySource.getEntities().forEach((values) => {
        values.forEach((value) => {
            console.log(value.value);
            if (value.value == "sys.log.type") value.setRemove();
            if (value.value == "G_CONSOLE") value.setRemove();
        })
    })

    entitySource.refresh();
    entitySource.removeEmptyRow();
}