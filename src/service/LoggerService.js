//@ts-check

import Config from '../Config';
import LoggerType from '../logger/LoggerType.js'
import Logger from './logger/Logger';
import LoggerFactory from './logger/LoggerFactory.js';

export default class {

    constructor() {
        /**@type {Config} controllerService */
        this.FOSConfig = (FOSValues.FOSConfig);
        this.loggerType = this.FOSConfig.config.get("sys.log.type") || LoggerType.CONSOLE;
    }

    /**
     * buildLogger
     * @param {string} system
     * @returns {Logger} 
     */
    buildLogger(system) {
        let loggerFactory = new LoggerFactory(system, this.FOSConfig);
        return loggerFactory.buildLogger(this.loggerType);
    }
}