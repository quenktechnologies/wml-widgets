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
var views = require("./wml/menu-icon");
var wml_1 = require("@quenk/wml");
///classNames:begin
exports.MENU_ICON = 'ww-menu-icon';
exports.MENU_ICON_DASH = 'ww-menu-icon__dash';
/**
 * MenuIcon provides a css implement icon normally used
 * to toggle a side menu.
 */
var MenuIcon = /** @class */ (function (_super) {
    __extends(MenuIcon, _super);
    function MenuIcon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: 'root',
                class: exports.MENU_ICON
            },
            dash: {
                id: 'dash',
                class: exports.MENU_ICON_DASH
            }
        };
        return _this;
    }
    return MenuIcon;
}(wml_1.Component));
exports.MenuIcon = MenuIcon;
//# sourceMappingURL=index.js.map