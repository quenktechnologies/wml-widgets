"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * CellClickedEvent is triggered when the whitespace of a cell is clicked.
 */
var CellClickedEvent = /** @class */ (function () {
    function CellClickedEvent(value, column, rowData, rowNumber, cell) {
        this.value = value;
        this.column = column;
        this.rowData = rowData;
        this.rowNumber = rowNumber;
        this.cell = cell;
    }
    return CellClickedEvent;
}());
exports.CellClickedEvent = CellClickedEvent;
//# sourceMappingURL=CellClickedEvent.js.map