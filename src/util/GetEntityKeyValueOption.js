//@ts-check

import EntityUnit from "../service/entity/EntityUnit";
import EntityKeyValueWrapper from "../service/entity/EntityKeyValueWrapper";

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
 * @param {EntityUnit} value
 * @param {EntityUnit} key
 * @param {Map<string, EntityKeyValueWrapper>} mapInNow
 * @return {?Map<string, EntityKeyValueWrapper>} margeMap
 */