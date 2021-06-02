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

        /**@type {DependencyService}} dependencyService */
        this.dependencyService = (FOSRequire("DependencyService"));
    }

    static getName() {
        throw new Error("Method 'getName()' must be implemented.");
    }
}