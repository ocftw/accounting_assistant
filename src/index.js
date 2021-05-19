import v8n from 'v8n';
import './Initialize';

import FOSLogger from './service/LoggerService'

global.testV8n = () => Logger.log(v8n().number().test("teasd"));

global.testLogger = () => {
    let logger = new FOSLogger("main");
    logger.log("Test log");
    logger.error("Test log2");
    logger.log("Test log3");
}

global.testConfig = () => {
    console.time("[init] read config");
    Logger.log(FOSValues.FOSConfig.secret.admin.name);
    console.timeEnd("[init] read config");
}

