import sheetUtil from './util/SheetUtil'

const secret = {
    admin: {
        name: "小知",
        slack: {
            user_id: "U01DEHWPU7J"
        }
    },
    config:{
        sheet: "1IDitf2M5YL_HEaw-GCSuYNalAIOqomRcaVrjtAmTKi4"
    }
}

const config = sheetUtil.getAllKeyValue(SpreadsheetApp.openById(secret.config.sheet).getSheetByName("global"))

export default {
    secret: secret,
    config: config
}