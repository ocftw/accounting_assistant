import RequireService from './service/RequireService';
import ControllerService from './service/ControllerService';
import DependencyService from './service/DependencyService'
import ScriptService from './service/ScriptService';
import TestService from './service/TestService'
import EndpointService from './service/EndpointService';
import LoggerService from './service/LoggerService';

FOSValues.FOSConfig.session.source = "System";

let FOSLogger = new LoggerService("System");
FOSLogger.info("Starting Financial Operating System Version " + FOSValues.FOSConfig.config.get("sys.version"));
FOSLogger.info("Environment " + FOSValues.FOSConfig.config.get("sys.env.name") + " loaded");
if (FOSValues.FOSConfig.config.get("debug")) FOSLogger.info("Debug mode: on");

FOSLogger.info("Initializing basic dependencies");

let requireService = new RequireService();
global.FOSRequire = requireService.require;

let controllerService = new ControllerService();
global.FOSValues.controllerService = controllerService;
requireService.addComponent("ControllerService", controllerService);

let dependenceService = new DependencyService();
requireService.addComponent("DependencyService", dependenceService);

let scriptService = new ScriptService();
requireService.addComponent("ScriptService", scriptService);

let endpointService = new EndpointService();
requireService.addComponent("EndpointService", endpointService);

FOSLogger.info("Initializing other dependencies");

//Import Dependency Test
let testService = new TestService();

//Ready to provide endpoint
FOSValues.FOSConfig.session.source = "unknow-endpoint";

