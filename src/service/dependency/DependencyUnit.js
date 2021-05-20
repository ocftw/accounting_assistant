export default class {

    constructor(id, method, self, parent) {
        this.id = id;
        this.method = method;
        this.self = self;
        this.parent = parent;
        this.__isUsed = false;
    }

    setUsed() {
        this.__isUsed = true;
    }

    isUsed() {
        return this.__isUsed;
    }
}