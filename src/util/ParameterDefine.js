import v8n from 'v8n';

export default class {
    constructor(checkFunction, isRequire = true) {
        if (v8n().not.boolean().test(isRequire)) {
            throw new Error("isRequire " + isRequire + " is not boolean")
        }

        if (typeof checkFunction !== 'function') {
            throw new Error("checkFunction must be a function");
        }

        this.checkFunction = checkFunction;
        this.isRequire = isRequire;
    }
}