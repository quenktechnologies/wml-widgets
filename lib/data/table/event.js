"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * HeadingClickedEvent is triggered when the user clicks on
 * one of the column headings.
 */
var HeadingClickedEvent = /** @class */ (function () {
    function HeadingClickedEvent(column) {
        this.column = column;
    }
    return HeadingClickedEvent;
}());
exports.HeadingClickedEvent = HeadingClickedEvent;
/**
 * CellClickedEvent triggered when a cell is clicked on.
 */
var CellClickedEvent = /** @class */ (function () {
    function CellClickedEvent(column, row) {
        this.column = column;
        this.row = row;
    }
    return CellClickedEvent;
}());
exports.CellClickedEvent = CellClickedEvent;
/**
 * DataChangedEvent generated when the internal representation of the data
 * changes.
 */
var DataChangedEvent = /** @class */ (function () {
    function DataChangedEvent(data, key) {
        this.data = data;
        this.key = key;
    }
    return DataChangedEvent;
}());
exports.DataChangedEvent = DataChangedEvent;
/**
 * SortRequestedEvent indicates an attempt to sort the table data was made.
 */
var SortRequestedEvent = /** @class */ (function () {
    function SortRequestedEvent(column, data, key) {
        this.column = column;
        this.data = data;
        this.key = key;
    }
    return SortRequestedEvent;
}());
exports.SortRequestedEvent = SortRequestedEvent;
//# sourceMappingURL=event.js.map