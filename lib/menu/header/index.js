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
var views = require("./wml/header");
var util_1 = require("../../util");
///classNames:begin
/**
 * MENU_HEADER
 */
exports.MENU_HEADER = 'ww-menu-header';
/**
 * MenuHeader can be used to display non-clickable heading text in a nav menu.
 */
var MenuHeader = /** @class */ (function (_super) {
    __extends(MenuHeader, _super);
    function MenuHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            span: {
                id: (_this.attrs.ww && _this.attrs.ww.id) ? _this.attrs.ww.id : '',
                className: util_1.concat(exports.MENU_HEADER, (_this.attrs.ww && _this.attrs.ww.className) ?
                    _this.attrs.ww.className : '')
            },
            text: (_this.attrs.ww && _this.attrs.ww.text) ?
                [document.createTextNode(_this.attrs.ww.text)] : _this.children
        };
        return _this;
    }
    return MenuHeader;
}(wml.Component));
exports.MenuHeader = MenuHeader;
//# sourceMappingURL=index.js.map