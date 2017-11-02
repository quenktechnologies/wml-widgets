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
var wml = require("@quenk/wml");
var icon_1 = require("./wml/icon");
var Sizes;
(function (Sizes) {
    Sizes["LG"] = "lg";
    Sizes["TWO"] = "2x";
    Sizes["THREE"] = "3x";
    Sizes["FOUR"] = "4x";
    Sizes["FIVE"] = "5x";
})(Sizes = exports.Sizes || (exports.Sizes = {}));
;
/**
 * FontIcon allows the usage of font icons.
 */
var FontIcon = /** @class */ (function (_super) {
    __extends(FontIcon, _super);
    function FontIcon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new icon_1.Main(_this);
        _this.values = {
            class: _this.attrs.ww.class
        };
        return _this;
    }
    return FontIcon;
}(wml.Component));
exports.FontIcon = FontIcon;
//# sourceMappingURL=FontIcon.js.map