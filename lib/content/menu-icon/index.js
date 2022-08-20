"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuIcon = exports.MENU_ICON_DASH = exports.MENU_ICON = void 0;
const views = require("./wml/menu-icon");
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
///classNames:begin
exports.MENU_ICON = 'ww-menu-icon';
exports.MENU_ICON_DASH = 'ww-menu-icon__dash';
/**
 * MenuIcon provides a css implement icon normally used
 * to toggle a side menu.
 */
class MenuIcon extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                id: (this.attrs.ww && this.attrs.ww.id) ?
                    this.attrs.ww.id : '',
                className: util_1.concat(exports.MENU_ICON, (this.attrs.ww && this.attrs.ww.id) ?
                    this.attrs.ww.id : '')
            },
            dash: {
                id: 'dash',
                class: exports.MENU_ICON_DASH
            }
        };
    }
}
exports.MenuIcon = MenuIcon;
//# sourceMappingURL=index.js.map