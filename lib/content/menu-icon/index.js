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
var views = require("./wml/menu-icon");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
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
                id: (_this.attrs.ww && _this.attrs.ww.id) ?
                    _this.attrs.ww.id : '',
                className: util_1.concat(exports.MENU_ICON, (_this.attrs.ww && _this.attrs.ww.id) ?
                    _this.attrs.ww.id : '')
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