//@ts-check

import Config from '../../Config';
import LoggerService from '../LoggerService';

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
     * debug
     * @param {string} message 
     */
    debug(message) {
        this.sendLogToRemote(message, "debug");
    }

    /**
     * info
     * @param {string} message 
     */
    info(message) {
        this.sendLogToRemote(message, "info");
    }

    /**
     * warn
     * @param {string} message 
     */
    warn(message) {
        this.sendLogToRemote(message, "warn");
    }

    /**
     * error
     * @param {string} message 
     */
    error(message) {
        this.sendLogToRemote(message, "error");
    }
    
    /**
     * sendLogToRemote
     * @param {string} message 
     * @param {string} level 
     */
    sendLogToRemote(message, level) {
        let data = {
            message: message,
            level: level,
            session: this.FOSConfig.session.session,
            system: this.system,
            source: this.FOSConfig.session.source,
            type: "Financial_Operating_System"
        };

        let options = {
            'method' : 'post',
            'contentType': 'application/json',
            'payload' : JSON.stringify(data)
        };

        //@ts-ignore
        UrlFetchApp.fetch('https://listener.logz.io:8071/?token=' + this.FOSConfig.config.get("logzio.token"), options);
    }
}