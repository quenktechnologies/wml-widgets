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
var names = require("@package/self/common/names");
var views = require("./wml/grid");
var wml_1 = require("@quenk/wml");
var util_1 = require("@package/self/common/util");
;
/**
 * Grid
 */
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Grid(_this);
        _this.values = {
            class: {
                root: util_1.concat(names.GRID, (_this.attrs.ww && _this.attrs.ww.class) ?
                    _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Grid;
}(wml_1.Component));
exports.Grid = Grid;
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Row(_this);
        _this.values = {
            class: {
                root: util_1.concat(names.GRID_ROW, (_this.attrs.ww && _this.attrs.ww.class) ?
                    _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Row;
}(wml_1.Component));
exports.Row = Row;
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Column(_this);
        _this.values = {
            class: {
                root: _this.attrs.ww ? util_1.concat(_this.attrs.ww.size ?
                    "col-md-" + _this.attrs.ww.size : 'col-md-12', _this.attrs.ww.class) : 'col-md-12'
            }
        };
        return _this;
    }
    return Column;
}(wml_1.Component));
exports.Column = Column;
//# sourceMappingURL=Grid.js.map