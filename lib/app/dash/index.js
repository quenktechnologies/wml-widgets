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
var wml_1 = require("@quenk/wml");
var dash_1 = require("./wml/dash");
///classNames:begin
/**
 * DASH
 */
exports.DASH = 'ww-dash';
///classNames:end
/**
 * Dash are literal horizontal dashes.
 *
 * These can be used with app/menu/Button to create 'hamburger' menus.
 */
var Dash = /** @class */ (function (_super) {
    __extends(Dash, _super);
    function Dash() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new dash_1.Main(_this);
        _this.values = {
            class: {
                root: exports.DASH
            }
        };
        return _this;
    }
    return Dash;
}(wml_1.Component));
exports.Dash = Dash;
//# sourceMappingURL=index.js.map