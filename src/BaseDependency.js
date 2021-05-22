import RequireService from './service/RequireService';
import ControllerService from './service/ControllerService';
import DependencyService from './service/DependencyService'
import ScriptService from './service/ScriptService';
import TestService from './service/TestService'
import EndpointService from './service/EndpointService';

FOSValues.FOSConfig.session.source = "system";
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

//Import Dependency Test
let testService = new TestService();

//Ready to provide endpoint
FOSValues.FOSConfig.session.source = "unknow-endpoint";

// dependenceService.requireDependency("TestService:test1");
// dependenceService.requireDependency("TestService:test2");

