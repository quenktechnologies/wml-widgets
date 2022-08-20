"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataChangedEvent = exports.CellClickedEvent = exports.HeadingClickedEvent = void 0;
/**
 * HeadingClickedEvent is triggered when the user clicks on
 * one of the column headings.
 */
class HeadingClickedEvent {
    constructor(column) {
        this.column = column;
    }
}
exports.HeadingClickedEvent = HeadingClickedEvent;
/**
 * CellClickedEvent triggered when a cell is clicked on.
 */
class CellClickedEvent {
    constructor(column, row) {
        this.column = column;
        this.row = row;
    }
}
exports.CellClickedEvent = CellClickedEvent;
/**
 * DataChangedEvent generated when the internal representation of the data
 * changes.
 */
class DataChangedEvent {
    constructor(name, data, key) {
        this.name = name;
        this.data = data;
        this.key = key;
    }
}
exports.DataChangedEvent = DataChangedEvent;
//# sourceMappingURL=event.js.map