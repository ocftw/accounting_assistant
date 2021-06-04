//@ts-check
import FOSLogger from './LoggerService';
import Config from '../Config';
import DependencyService from './DependencyService';

export default class AbstractService {
    constructor() {
        // @ts-ignore
        this.logger = new FOSLogger(this.constructor.getName());

        /**@type {Config} config */
        this.config = (FOSRequire("config"));
        // @ts-ignore
        this.getServiceConfig = this.config.getLocalConfig(this.constructor.getName());
        // @ts-ignore
        this.hasServiceConfig = this.config.hasLocalConfig(this.constructor.getName());

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