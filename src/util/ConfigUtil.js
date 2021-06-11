export default class {

    /**
     * getSecondClassArray
     * @param {string} node 
     * @param {Map<string, string>} source 
     */
    static getSecondClassArray(node, source) {
        let keyArray = [];

        source.forEach((value, key) => {
            if (key.startsWith(node)) {
                keyArray.push(key.substring(node.length + 1).split(".")[0]);
            }
        })
        
        return keyArray;
    }
}