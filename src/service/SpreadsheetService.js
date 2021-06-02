//@ts-check
import AbstractService from './AbstractService';

export default class extends AbstractService{
    static getName() {
        return "Spreadsheet";
    }

    constructor() {
        super();
    }

    openRepository() {
    }

    preInitRepository() {
        
    }

    initRepository() {
        
    }

    checkMetadataAvailable(name) {
        if (this.config.has("Spreadsheet." + name + ".url")) {
            this.logger.error("Unable to find Spreadsheet url with " + name);
            throw new Error("Unable to find Spreadsheet url with " + name);
        }        
    }
}