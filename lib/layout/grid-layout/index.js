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
var views = require("./wml/grid-layout");
var util_1 = require("../../util");
var _1 = require("../");
///classNames:begin
//@todo: refactor this to be inline with other class names
exports.GRID_LAYOUT = 'container-fluid';
exports.COLUMN = 'ww-column';
exports.ROW = 'row';
;
/**
 * GridLayout
 */
var GridLayout = /** @class */ (function (_super) {
    __extends(GridLayout, _super);
    function GridLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Grid(_this);
        _this.values = {
            content: {
                id: 'root',
                class: util_1.concat(exports.GRID_LAYOUT, (_this.attrs.ww && _this.attrs.ww.class) ?
                    _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return GridLayout;
}(_1.GenericLayout));
exports.GridLayout = GridLayout;
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Row(_this);
        _this.values = {
            content: {
                id: 'row',
                class: util_1.concat(exports.ROW, (_this.attrs.ww && _this.attrs.ww.class) ?
                    _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Row;
}(_1.GenericLayout));
exports.Row = Row;
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Column(_this);
        _this.values = {
            content: {
                id: 'column',
                class: _this.attrs.ww ? util_1.concat(_this.attrs.ww.size ?
                    "col-md-" + _this.attrs.ww.size : 'col-md-12', _this.attrs.ww.class) : 'col-md-12'
            }
        };
        return _this;
    }
    return Column;
}(_1.GenericLayout));
exports.Column = Column;
//# sourceMappingURL=index.js.map