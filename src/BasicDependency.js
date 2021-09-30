import RequireService from './service/RequireService';
import ControllerService from './service/ControllerService';
import DependencyService from './service/DependencyService';
import LoggerService from './service/LoggerService';
import EntityService from './service/EntityService';

FOSValues.FOSConfig.session.source = "system";

let loggerService = new LoggerService();
let FOSLogger = loggerService.buildLogger("BasicDependency");

FOSLogger.info("Starting Financial Operating System Version " + FOSValues.FOSConfig.config.get("sys.version"));
FOSLogger.info("Environment " + FOSValues.FOSConfig.config.get("sys.env.name") + " loaded");
if (FOSValues.FOSConfig.config.get("debug")) FOSLogger.info("Debug mode: on");

FOSLogger.info("Initializing basic dependencies");

let requireService = new RequireService(loggerService);
requireService.addComponent("RequireService", requireService);
global.FOSRequire = requireService.require;

requireService.addComponent("FOSConfig", FOSValues.FOSConfig);
requireService.addComponent("LoggerService", loggerService);

let dependenceService = new DependencyService();
requireService.addComponent("DependencyService", dependenceService);

let entityService = new EntityService();
requireService.addComponent("EntityService", entityService);

let controllerService = new ControllerService();
global.FOSValues.controllerService = controllerService;
requireService.addComponent("ControllerService", controllerService);
