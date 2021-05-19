import RequireService from './service/RequireService';
import ControllerService from './service/ControllerService';

let requireService = new RequireService();
global.FOSRequire = requireService.require;

let controllerService = new ControllerService();
global.FOSValues.controllerService = controllerService;
