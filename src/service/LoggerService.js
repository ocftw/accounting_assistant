import LoggerType from '../logger/LoggerType.js'

export default class {
    constructor(source){
        this.FOSConfig = FOSValues.FOSConfig;
        this.loggerType = this.FOSConfig.config.get("sys.log.type") || LoggerType.CONSOLE;

        switch (this.loggerType) {
            case LoggerType.CONSOLE:
                this.log = (message) => {
                    Logger.log(new Date().today() + " " + new Date().timeNow() + "  [INFO] [" + source.padStart(15) + "]" + message);
                }

                this.warn = (message) => {
                    Logger.log(new Date().today() + " " + new Date().timeNow() + "  [WARN] [" + source.padStart(15) + "]" + message);
                }

                this.error = (message) => {
                    Logger.log(new Date().today() + " " + new Date().timeNow() + " [ERROR] [" + source.padStart(15) + "]" + message);
                }

                break;
            default:
                break;
        }
    }
}