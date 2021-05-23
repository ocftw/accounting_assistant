import LoggerType from '../logger/LoggerType.js'

export default class {
    constructor(source){
        this.FOSConfig = FOSValues.FOSConfig;
        this.loggerType = this.FOSConfig.config.get("sys.log.type") || LoggerType.CONSOLE;

        switch (this.loggerType) {
            case LoggerType.G_CONSOLE:

                if (this.FOSConfig.config.get("debug")) {
                    this.debug = (message) => {
                        let sessionSource = "Dev-" + this.FOSConfig.session.session + "-" + this.FOSConfig.session.source;
                        console.log(this.getDefaultMessageFormat(message, sessionSource, source));
                    }    
                } else {
                    this.debug = (message) => {}
                }

                this.info = (message) => {
                    let sessionSource = this.FOSConfig.session.session + "-" + this.FOSConfig.session.source;
                    console.info(this.getDefaultMessageFormat(message, sessionSource, source));
                }

                this.warn = (message) => {
                    let sessionSource = this.FOSConfig.session.session + "-" + this.FOSConfig.session.source;
                    console.warn(this.getDefaultMessageFormat(message, sessionSource, source));
                }

                this.error = (message) => {
                    let sessionSource = this.FOSConfig.session.session + "-" + this.FOSConfig.session.source;
                    console.error(this.getDefaultMessageFormat(message, sessionSource, source));
                }

                break;
            default:
                break;
        }
    }
    
    getDefaultMessageFormat(message, sessionSource, source, level) {
        if (typeof level === "undefined") {
            return "[" + sessionSource.padStart(23) + "] " + source.padEnd(20) + ": " + message;
        }
        return level.padStart(5) + "---" + "[" + sessionSource.padStart(21) + "] " + source.padEnd(20) + ": " + message;
    }

    getDateTime() {
        return new Date().today() + " " + new Date().timeNow();
    }
}