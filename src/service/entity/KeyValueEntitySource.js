//@ts-check

import EntityKeyValueWrapper from "./EntityKeyValueWrapper";
import EntitySource from "./EntitySource";

export default class {

    /**
     * 
     * @param {Map<string, EntityKeyValueWrapper>} entityKeyValueMap 
     * @param {EntitySource[]} entitySourceList
     */
    constructor(entityKeyValueMap, entitySourceList) {
        this.entityKeyValueMap = entityKeyValueMap;

        /**@type {EntitySource[]} */
        this.entitySourceList = entitySourceList;
    }

    put(key, value) {
        
    }

    putAll(map) {
        
    }

    get(key) {
        return this.entityKeyValueMap.get(key);
    }

    remove(key) {
        
    }

    refresh() {
        this.entitySourceList.forEach((value) => {
            value.refresh();
        })
    }
}