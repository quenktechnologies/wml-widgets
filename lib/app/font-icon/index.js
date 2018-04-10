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
var font_icon_1 = require("./wml/font-icon");
/**
 * FontIcon allows the usage of font icons.
 */
var FontIcon = /** @class */ (function (_super) {
    __extends(FontIcon, _super);
    function FontIcon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new font_icon_1.Main(_this);
        _this.values = {
            root: {
                class: _this.attrs.ww ? _this.attrs.ww.class : ''
            }
        };
        return _this;
    }
    return FontIcon;
}(wml.Component));
exports.FontIcon = FontIcon;
//# sourceMappingURL=index.js.map