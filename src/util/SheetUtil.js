export default class {
    static sheetIsEmpty(sheet){
        return sheet.getDataRange().isBlank();
    }

    static getAllKeyValue(sheet){
        let values = sheet.getRange(2 ,1 , 2, sheet.getLastRow()).getValues();
        let map = new Map()

        values.forEach(element => {
            map.set(element[0], element[1]);
        });

        return map;
    }
}