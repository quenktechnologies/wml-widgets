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
var wml_1 = require("@quenk/wml");
var style_1 = require("../../content/style");
exports.Style = style_1.Style;
var util_1 = require("../../util");
var __1 = require("../../");
var callout_1 = require("./wml/callout");
///classNames:begin
exports.CALLOUT = 'ww-callout';
/**
 * Callout
 */
var Callout = /** @class */ (function (_super) {
    __extends(Callout, _super);
    function Callout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new callout_1.Main(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.CALLOUT, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.style) ?
                style_1.getStyleClassName(_this.attrs.ww.style) :
                style_1.DEFAULT)
        };
        return _this;
    }
    return Callout;
}(wml_1.Component));
exports.Callout = Callout;
//# sourceMappingURL=index.js.map