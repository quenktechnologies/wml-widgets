"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/table");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
///classNames:begin
exports.TABLE_HEADER = 'ww-table-layout__header';
exports.TABLE_BODY = 'ww-table-layout__body';
exports.TABLE_FOOTER = 'ww-table-layout__footer';
exports.TABLE_ROW = 'ww-table-layout__row';
exports.TABLE_HEADING = 'ww-table-layout _heading';
exports.TABLE_CELL = 'ww-table-layout__cell';
exports.TABLE_LAYOUT = 'ww-table-layout';
exports.TABLE_WINDOW = 'ww-table-window';
exports.BORDERED = '-bordered';
exports.COMPACT = '-compact';
exports.ALTERNATE = '-alternate';
exports.HOVERABLE = '-hoverable';
/**
 * TableHeader (<thead>)
 */
var TableHeader = /** @class */ (function (_super) {
    __extends(TableHeader, _super);
    function TableHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.TableHeader(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.TABLE_HEADER, __1.getClassName(_this.attrs))
        };
        return _this;
    }
    return TableHeader;
}(wml_1.Component));
exports.TableHeader = TableHeader;
/**
 * TableBody
 */
var TableBody = /** @class */ (function (_super) {
    __extends(TableBody, _super);
    function TableBody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.TableBody(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.TABLE_BODY, __1.getClassName(_this.attrs))
        };
        return _this;
    }
    return TableBody;
}(wml_1.Component));
exports.TableBody = TableBody;
/**
 * TableFooter
 */
var TableFooter = /** @class */ (function (_super) {
    __extends(TableFooter, _super);
    function TableFooter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.TableFooter(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.TABLE_FOOTER, __1.getClassName(_this.attrs))
        };
        return _this;
    }
    return TableFooter;
}(wml_1.Component));
exports.TableFooter = TableFooter;
/**
 * TableRow
 */
var TableRow = /** @class */ (function (_super) {
    __extends(TableRow, _super);
    function TableRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.TableRow(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.TABLE_ROW, __1.getClassName(_this.attrs)),
            onclick: (_this.attrs.ww && _this.attrs.ww.onclick) ?
                _this.attrs.ww.onclick : undefined
        };
        return _this;
    }
    return TableRow;
}(wml_1.Component));
exports.TableRow = TableRow;
/**
 * TableHeading
 */
var TableHeading = /** @class */ (function (_super) {
    __extends(TableHeading, _super);
    function TableHeading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.TableHeading(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.TABLE_HEADING, __1.getClassName(_this.attrs)),
            onclick: (_this.attrs.ww && _this.attrs.ww.onclick) ?
                _this.attrs.ww.onclick : undefined
        };
        return _this;
    }
    return TableHeading;
}(wml_1.Component));
exports.TableHeading = TableHeading;
/**
 * TableCell
 */
var TableCell = /** @class */ (function (_super) {
    __extends(TableCell, _super);
    function TableCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.TableCell(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.TABLE_CELL, __1.getClassName(_this.attrs)),
            onclick: (_this.attrs.ww && _this.attrs.ww.onclick) ?
                _this.attrs.ww.onclick : undefined
        };
        return _this;
    }
    return TableCell;
}(wml_1.Component));
exports.TableCell = TableCell;
/**
 * TableWindow allows a TableLayout to be scrolled on smaller screens.
 */
var TableWindow = /** @class */ (function (_super) {
    __extends(TableWindow, _super);
    function TableWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.TableWindow(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.TABLE_WINDOW, __1.getClassName(_this.attrs))
        };
        return _this;
    }
    return TableWindow;
}(wml_1.Component));
exports.TableWindow = TableWindow;
/**
 * TableLayout provides a <table> based layout.
 */
var TableLayout = /** @class */ (function (_super) {
    __extends(TableLayout, _super);
    function TableLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.TableLayout(_this);
        _this.values = {
            wml: {
                id: 'table'
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.TABLE_LAYOUT, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.alternate) ? exports.ALTERNATE : '', (_this.attrs.ww && _this.attrs.ww.bordered) ? exports.BORDERED : '', (_this.attrs.ww && _this.attrs.ww.compact) ? exports.COMPACT : '', (_this.attrs.ww && _this.attrs.ww.hoverable) ? exports.HOVERABLE : ''),
        };
        return _this;
    }
    return TableLayout;
}(wml_1.Component));
exports.TableLayout = TableLayout;
//# sourceMappingURL=index.js.map