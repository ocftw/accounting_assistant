//@ts-check
import AbstractService from './AbstractService';

export default class extends AbstractService{

    static getName() {
        return "DriveService";
    }

    constructor() {
        super();

        if (this.isDevelopment()) {
            this.rootFolder = DriveApp.getFolderById("17cDYiblSnbrNjJ3Mzx62sGwrCoS_Kmrx");
        } else {
            throw new Error("TODO and not ready");
        }
    }

    /**
     * getRootFolder
     * @returns {GoogleAppsScript.Drive.Folder}
     */
    getRootFolder() {
        return this.rootFolder;
    }

    /**
     * checkFolderAvailable
     * @param {string} name folder name
     * @param {GoogleAppsScript.Drive.Folder} folder 
     * @returns {GoogleAppsScript.Drive.Folder | null}
     */
    getFolder(name, folder = this.rootFolder) {
        let folders = folder.getFoldersByName(name);
        if (folders.hasNext()) return folders.next();
        else return null;
    }

    /**
     * createFolder
     * @param {string} name folder name
     * @param {GoogleAppsScript.Drive.Folder} folder 
     */
    createFolder(name, folder = this.rootFolder) {
        folder.createFolder(name);
    }

    /**
     * getSpreadsheet
     * @param {string} name file name
     * @param {GoogleAppsScript.Drive.Folder} folder 
     * @returns {GoogleAppsScript.Spreadsheet.Spreadsheet | null} Spreadsheet file
     */
    getSpreadsheet(name, folder=this.rootFolder) {
        let files = folder.getFilesByName(name)
        while (files.hasNext()) {
            let file = files.next();
            if (file.getMimeType() === "Google Sheets") {
                return SpreadsheetApp.openById(file.getId());
            }
        }
        return null;
    }

    /**
     * createSpreadsheet
     * @param {string} name file name
     * @param {GoogleAppsScript.Drive.Folder} folder 
     * @returns {GoogleAppsScript.Spreadsheet.Spreadsheet} Spreadsheet file
     */
    createSpreadsheet(name, folder = this.rootFolder) {
        let spreadsheet = SpreadsheetApp.create(name);
        let file = DriveApp.getFileById(spreadsheet.getId());
        file.moveTo(folder);
        return spreadsheet;
    }
}