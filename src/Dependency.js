import LoggerService from './service/LoggerService';
import DriveService from './service/DriveService';
import ScriptService from './service/ScriptService';
import EndpointService from './service/EndpointService';

let FOSLogger = new LoggerService("System");
FOSLogger.info("Initializing dependencies");

let requireService = FOSRequire("RequireService");

let driveService = new DriveService();
requireService.addComponent("DriveService", driveService);

let scriptService = new ScriptService();
requireService.addComponent("ScriptService", scriptService);

let endpointService = new EndpointService();
requireService.addComponent("EndpointService", endpointService);


FOSLogger.info("Initializing other dependencies");

//Import Dependency Test
import TestService from './service/TestService';
let testService = new TestService();
