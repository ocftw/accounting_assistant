//@ts-check

import GConsoleLogger from './GConsoleLogger';
import Config from '../../Config';
import LoggerType from '../../logger/LoggerType.js'
import Logger from './Logger';
import LogManagement from './LogManagement';

export default class {

    /**
     * constructor
     * @param {string} system 
     * @param {Config} FOSConfig 
     */
    constructor(system, FOSConfig) {
        this.system = system;
        this.FOSConfig = FOSConfig;
    }

    /**
     * buildLogger
     * @param {any} loggerType 
     */
    buildLogger(loggerType) {
        switch (loggerType) {
            case LoggerType.G_CONSOLE:
                let logger = new Logger();
                let gconsoleLogger = new GConsoleLogger(this.system, this.FOSConfig);
                let logManagement = new LogManagement(this.system, this.FOSConfig);

                logger.debug = (message) => {
                    if (this.FOSConfig.config.get("debug")) gconsoleLogger.debug(message);
                    logManagement.debug(message);
                };

                logger.info = (message) => {
                    gconsoleLogger.info(message);
                    logManagement.info(message);
                }
                
                logger.warn = (message) => {
                    gconsoleLogger.warn(message);
                    logManagement.warn(message);
                }

                logger.error = (message) => {
                    gconsoleLogger.error(message);
                    logManagement.error(message);
                }
                
                return logger;
            default:
                break;
        }
    }
}