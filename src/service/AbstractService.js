//@ts-check
import LoggerService from './LoggerService';
import Config from '../Config';
import DependencyService from './DependencyService';
import Logger from './logger/Logger';

export default class AbstractService {
    constructor() {

        //@ts-ignore
        let serviceName = this.constructor.getName();

        /**@type {LoggerService} logger */
        let loggerService = (FOSRequire("LoggerService"));

        /**@type {Logger} logger */
        this.logger = (loggerService.buildLogger(serviceName));
        
        /**@type {Config} config */
        this.config = (FOSRequire("config"));
        
        this.getServiceConfig = this.config.getLocalConfig(serviceName);
        this.hasServiceConfig = this.config.hasLocalConfig(serviceName);

        /**@type {DependencyService}} dependencyService */
        this.dependencyService = (FOSRequire("DependencyService"));
    }

    /**
     * @returns {boolean}
     */
    isDevelopment() {
        return this.getConfigValue("sys.env.name") === "Development";
    }

    /**
     * getConfigValue
     * @param {string} key config key
     */
    getConfigValue(key) {
        return this.config.config.get(key);
    }

    static getName() {
        throw new Error("Method 'getName()' must be implemented.");
    }
}