"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = exports.Row = exports.GridLayout = exports.GRID_LAYOUT_COLUMN = exports.GRID_LAYOUT_ROW = exports.GRID_LAYOUT = void 0;
var views = require("./wml/grid");
var util_1 = require("../../util");
var __1 = require("../");
///classNames:begin
exports.GRID_LAYOUT = 'ww-grid-layout';
exports.GRID_LAYOUT_ROW = 'ww-grid-layout__row';
exports.GRID_LAYOUT_COLUMN = 'ww-grid-layout__column';
;
/**
 * GridLayout
 */
var GridLayout = /** @class */ (function (_super) {
    __extends(GridLayout, _super);
    function GridLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.GridLayout(_this);
        _this.values = {
            content: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                wml: {
                    id: 'root',
                },
                className: function () {
                    var c = (_this.attrs.ww && _this.attrs.ww.className) ?
                        _this.attrs.ww.className : '';
                    return util_1.concat(exports.GRID_LAYOUT, __1.LAYOUT, c);
                }
            }
        };
        return _this;
    }
    return GridLayout;
}(__1.AbstractLayout));
exports.GridLayout = GridLayout;
/**
 * Row
 */
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Row(_this);
        _this.values = {
            content: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                wml: {
                    id: 'row',
                },
                className: function () {
                    var c = (_this.attrs.ww && _this.attrs.ww.className) ?
                        _this.attrs.ww.className : '';
                    return util_1.concat(exports.GRID_LAYOUT_ROW, c);
                }
            }
        };
        return _this;
    }
    return Row;
}(__1.AbstractLayout));
exports.Row = Row;
/**
 * Column
 */
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Column(_this);
        _this.values = {
            content: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                wml: {
                    id: 'column'
                },
                className: function () {
                    if (_this.attrs.ww != null) {
                        return util_1.concat(exports.GRID_LAYOUT_COLUMN, _this.attrs.ww.span ?
                            "-span" + _this.attrs.ww.span :
                            '-span12', _this.attrs.ww.offset ?
                            "-offset" + _this.attrs.ww.offset :
                            '', _this.attrs.ww.className);
                    }
                    else {
                        return util_1.concat(exports.GRID_LAYOUT_COLUMN, '-span12');
                    }
                }
            }
        };
        return _this;
    }
    return Column;
}(__1.AbstractLayout));
exports.Column = Column;
//# sourceMappingURL=index.js.map