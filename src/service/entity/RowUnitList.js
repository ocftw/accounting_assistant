//@ts-check

import SheetUtil from "../../util/SheetUtil";
import EntityUnit from "./EntityUnit";
import RowUnit from "./RowUnit";

export default class {
    constructor() {
        /**@type {RowUnit} */
        this.head = null;
        this.size = 0;
    }

    /**
     * add
     * @param {RowUnit} rowUnit
     */
    add(rowUnit) {
        let current;

        if (this.head == null) this.head = rowUnit;
        else {
            current = this.head;
            while (current.next) current = current.next;
            current.next = rowUnit;
        }
        this.size++;
    }

    /**
     * insertAt
     * @param {RowUnit} rowUnit 
     * @param {number} index 
     */
    insertAt(rowUnit, index) {
        if (index < 0 || index > this.size)
            throw new Error("Invalid index");
        else {
            let current, previous;
            current = this.head;

            if (index == 0) {
                rowUnit.next = this.head;
                this.head = rowUnit;
            } else {
                current = this.head;
                let iterate = 0;

                while (iterate < index) {
                    iterate++;
                    previous = current;
                    current = current.next;
                }

                rowUnit.next = current;
                previous.next = rowUnit;
            }
            this.size++;
        }
    }

    /**
     * removeFrom
     * @param {number} index 
     */
    removeFrom(index) {
        if (index < 0 || index >= this.size)
            throw new Error("Invalid index");
        else {
            let current, previous, iterate = 0;
            current = this.head;
            previous = current;

            if (index === 0) {
                this.head = current.next;
            } else {

                while (iterate < index) {
                    iterate++;
                    previous = current;
                    current = current.next;
                }

                previous.next = current.next;
            }
            this.size--;

            return current;
        }
    }

    /**
     * removeElement
     * @param {RowUnit} rowUnit 
     */
    removeElement(rowUnit) {
        let current = this.head;
        let previous = null;

        // iterate over the list
        while (current != null) {
            if (current === rowUnit) {
                if (previous == null) {
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }
                this.size--;
                return current;
            }
            previous = current;
            current = current.next;
        }
        return -1;
    }

    /**
     * indexOf
     * @param {RowUnit} rowUnit 
     */
    indexOf(rowUnit) {
        let count = 0;
        let current = this.head;

        while (current != null) {
            if (current === rowUnit) return count;
            count++;
            current = current.next;
        }

        return -1;
    }

    /**
     * get
     * @param {number} index 
     */
    get(index) {
        let count = 0;
        let current = this.head;

        while (current != null) {
            if (index === count) return current;
            count++;
            current = current.next;
        }

        return -1;
    }

    listSize() {
        return this.size;
    }

    sortEmpty() {
        let current = this.head;

        do {
            //@ts-ignore
            if (SheetUtil.isEmptyRow(current.entities)) {
                this.removeElement(current);
                this.add(current);
            }

            current = current.next;
        }
        while (current.next);
        
    }

    syncRowUnit() {
        let count = 0;
        let current = this.head;
        do {
            current.sync(count);
            current = current.next;
            count++;
        }
        while (current.next);
    }

    /**
     * @returns {EntityUnit[][]}
     */
    getTwoDimensionalArray() {
        /**@type {EntityUnit[][]} */
        let array = [];
        let current = this.head;
        let count = 0;

        do {
            array[count] = [];
            let entityCount = 0;
            current.entities.forEach((values) => {
                array[count][entityCount] = values;
                entityCount++;
            })

            current = current.next;
            count++;
        }
        while (current.next);

        return array;
    }
}