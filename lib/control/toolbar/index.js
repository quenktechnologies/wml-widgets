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
exports.Toolbar = exports.TOOLBAR_COMPAT = exports.TOOLBAR = void 0;
var views = require("./wml/toolbar");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
///classNames:begin
exports.TOOLBAR = 'ww-toolbar';
exports.TOOLBAR_COMPAT = '-toolbar-compat';
/**
 * Toolbar provides a widget for grouping related controls into a
 * single row.
 */
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.TOOLBAR, __1.getClassName(_this.attrs))
            }
        };
        return _this;
    }
    return Toolbar;
}(wml_1.Component));
exports.Toolbar = Toolbar;
//# sourceMappingURL=index.js.map