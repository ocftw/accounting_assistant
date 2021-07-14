//@ts-check

import Config from '../../Config';

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
        let sessionSource = "Dev-" + this.FOSConfig.session.session + "-" + this.FOSConfig.session.source;
        console.log(this.getDefaultMessageFormat(message, sessionSource, this.system));
    }

    /**
     * info
     * @param {string} message 
     */
    info(message) {
        let sessionSource = this.FOSConfig.session.session + "-" + this.FOSConfig.session.source;
        console.info(this.getDefaultMessageFormat(message, sessionSource, this.system));
    }

    /**
     * warn
     * @param {string} message 
     */
    warn(message) {
        let sessionSource = this.FOSConfig.session.session + "-" + this.FOSConfig.session.source;
        console.warn(this.getDefaultMessageFormat(message, sessionSource, this.system));
    }

    /**
     * error
     * @param {string} message 
     */
    error(message) {
        let sessionSource = this.FOSConfig.session.session + "-" + this.FOSConfig.session.source;
        console.error(this.getDefaultMessageFormat(message, sessionSource, this.system));
    }

    getDefaultMessageFormat(message, sessionSource, source, level) {
        if (typeof level === "undefined") {
            return "[" + sessionSource.padStart(23) + "] " + source.padEnd(20) + ": " + message;
        }
        return level.padStart(5) + "---" + "[" + sessionSource.padStart(21) + "] " + source.padEnd(20) + ": " + message;
    }

    getDateTime() {
        //@ts-ignore
        return new Date().today() + " " + new Date().timeNow();
    }
}