//@ts-check


export default class {

    /**
     * @param {?string} key - The key in sheet.
     * @param {optionCallback} callback
     */
    constructor(key, callback) {
        this.key = key;
        this.callback = callback;
    }
}

/**
 * This callback is displayed as a global member.
 * @callback optionCallback
 * @param {string} value
 * @param {string} key
 * @param {Map<string, string>} mapInNow
 * @return {?Map<string, string>} margeMap
 */