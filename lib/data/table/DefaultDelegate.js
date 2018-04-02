"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * DefaultDelegate will handle table events if no Delegate is
 * specified.
 *
 * It passes it's events onto registered callbacks.
 */
var DefaultDelegate = /** @class */ (function () {
    function DefaultDelegate(table) {
        this.table = table;
    }
    DefaultDelegate.prototype.onAllSelected = function (e) {
        if (this.table.attrs.ww.onAllSelected)
            this.table.attrs.ww.onAllSelected(e);
    };
    DefaultDelegate.prototype.onCellClicked = function (e) {
        if (this.table.attrs.ww.onCellClicked)
            this.table.attrs.ww.onCellClicked(e);
    };
    DefaultDelegate.prototype.onHeadingClicked = function (e) {
        if (this.table.attrs.ww.onHeadingClicked)
            this.table.attrs.ww.onHeadingClicked(e);
    };
    DefaultDelegate.prototype.onRowClicked = function (e) {
        if (this.table.attrs.ww.onRowClicked)
            this.table.attrs.ww.onRowClicked(e);
    };
    DefaultDelegate.prototype.onRowSelected = function (e) {
        if (this.table.attrs.ww.onRowSelected)
            this.table.attrs.ww.onRowSelected(e);
    };
    return DefaultDelegate;
}());
exports.DefaultDelegate = DefaultDelegate;
//# sourceMappingURL=DefaultDelegate.js.map