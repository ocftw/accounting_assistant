class AbstractController {
    constructor() {
        if (this.constructor == AbstractController) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    run() {
        throw new Error("Method 'run()' must be implemented.");
    }
}

export {AbstractController}