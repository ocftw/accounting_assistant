//@ts-check
import AbstractService from './AbstractService';
import FOSLogger from './LoggerService';

export default class extends AbstractService{

    static getName() {
        return "DriveService";
    }

    constructor() {
        super();

        if (this.getServiceConfig("debug")) {
            this.rootFolder = DriveApp.getFolderById("17cDYiblSnbrNjJ3Mzx62sGwrCoS_Kmrx");
        } else {
            
        }
    }

    getRootFolder() {
        return this.rootFolder;
    }

    checkFolderAvailable(name) {
        if (this.rootFolder.getFoldersByName(name).hasNext()) return true;
        else return false;
    }
}