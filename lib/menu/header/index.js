"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuHeader = exports.MENU_HEADER = void 0;
const wml = require("@quenk/wml");
const document = require("@quenk/wml/lib/dom");
const views = require("./wml/header");
const util_1 = require("../../util");
///classNames:begin
/**
 * MENU_HEADER
 */
exports.MENU_HEADER = 'ww-menu-header';
/**
 * MenuHeader can be used to display non-clickable heading text in a nav menu.
 */
class MenuHeader extends wml.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            span: {
                id: (this.attrs.ww && this.attrs.ww.id) ? this.attrs.ww.id : '',
                className: util_1.concat(exports.MENU_HEADER, (this.attrs.ww && this.attrs.ww.className) ?
                    this.attrs.ww.className : '')
            },
            text: (this.attrs.ww && this.attrs.ww.text) ?
                [document.createTextNode(this.attrs.ww.text)] : this.children
        };
    }
}
exports.MenuHeader = MenuHeader;
//# sourceMappingURL=index.js.map