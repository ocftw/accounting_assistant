import RequireService from './service/RequireService';
import ControllerService from './service/ControllerService';
import DependencyService from './service/DependencyService'
import TestService from './service/TestService'

let requireService = new RequireService();
global.FOSRequire = requireService.require;

let controllerService = new ControllerService();
global.FOSValues.controllerService = controllerService;
requireService.addComponent("ControllerService", controllerService);

let dependenceService = new DependencyService();
requireService.addComponent("DependencyService", dependenceService);

//Test

let testService = new TestService();

dependenceService.requireDependency("TestService:test1");
dependenceService.requireDependency("TestService:test2");

