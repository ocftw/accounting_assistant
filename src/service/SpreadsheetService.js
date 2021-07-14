//@ts-check
import AbstractService from './AbstractService';
import DriveService from './DriveService'

export default class extends AbstractService{
    static getName() {
        return "SpreadsheetService";
    }

    constructor() {
        super();

        this.createLocalConfig = this.config.createLocalConfig("SpreadsheetService");

        /** @type {DriveService} */
        this.driveService = (FOSRequire("DriveService"));

        this.check();
        /** @type {GoogleAppsScript.Drive.Folder} */
        this.serviceFolderRoot = this.driveService.getFolder("SpreadsheetService");


        this.createMetadataSpreadsheet("testSeries");
    }

    testNewSpreadsheet() {
        
    }

    testLoadSpreadsheet() {
        
    }

    /**
     * initRepository
     * @param {string} name spreadsheetName
     * @param {string} spreadsheetId spreadsheetId
     * @param {string} series seriesName
     */
    initRepository(name, spreadsheetId, series) {
        if (this.checkMetadataAvailable(series)) {
            this.logger.error("The series " + series + " already exists");
            throw new Error("The series " + series + " already exists");
        }
    }

    /**
     * loadRepository
     * @param {string} spreadsheet spreadsheetId
     * @param {string} series seriesName
     */
    loadRepository(spreadsheet, series) {
        if (this.checkMetadataAvailable(series)) {
            this.logger.error("The series " + series + " does not exists");
            throw new Error("The series " + series + " does not exists");
        }
    }

    /**
     * checkMetadataAvailable
     * @param {string} series Spreadsheet series
     * @returns {boolean}
     */
    checkMetadataAvailable(series) {
        return this.hasServiceConfig("spreadsheet." + series + ".metadata");
    }

    /**
     * createMetadataSpreadsheet
     * @param {string} series Spreadsheet series
     * @returns {GoogleAppsScript.Spreadsheet.Spreadsheet}
     */
    createMetadataSpreadsheet(series) {
        let metadataSpreadsheet = this.driveService.createSpreadsheet(series, this.serviceFolderRoot);
        this.createLocalConfig(series, metadataSpreadsheet.getId());
        return metadataSpreadsheet;
    }

    check() {
        this.checkDefaultFolderExist();
    }

    checkDefaultFolderExist() {
        if (this.driveService.getFolder("SpreadsheetService") === null) {
            this.driveService.createFolder("SpreadsheetService");
        }
    }
}