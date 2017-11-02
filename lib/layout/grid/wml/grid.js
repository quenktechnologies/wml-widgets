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
var $wml = require("@quenk/wml");
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('section', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Grid;
}($wml.AppView));
exports.Grid = Grid;
;
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Row;
}($wml.AppView));
exports.Row = Row;
;
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);
        };
        return _this;
    }
    return Column;
}($wml.AppView));
exports.Column = Column;
//# sourceMappingURL=grid.js.map