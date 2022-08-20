"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = exports.HeaderItem = exports.CONTENT_MODE = exports.NAV_MODE = exports.MENU_HEADER_ITEM = exports.MENU = void 0;
const hidden = require("../../content/state/hidden");
const headerViews = require("./wml/header");
const wml_1 = require("@quenk/wml");
const dom_1 = require("@quenk/wml/lib/dom");
const util_1 = require("../../util");
const orientation_1 = require("../../content/orientation");
const __1 = require("../../");
const menu_1 = require("./wml/menu");
///classNames:begin
exports.MENU = 'ww-menu';
exports.MENU_HEADER_ITEM = 'ww-menu__header-item';
///classNames:end
exports.NAV_MODE = 'nav';
exports.CONTENT_MODE = 'content';
/**
 * HeaderItem
 */
class HeaderItem extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new headerViews.Main(this);
        this.values = {
            root: {
                className: util_1.concat(exports.MENU_HEADER_ITEM, __1.getClassName(this.attrs)),
                content: (this.attrs.ww && this.attrs.ww.text) ?
                    [dom_1.text(this.attrs.ww.text)] : this.children
            }
        };
    }
}
exports.HeaderItem = HeaderItem;
/**
 * Menu provides a DOM container for rendering
 * a dropdown style menu.
 */
class Menu extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new menu_1.Main(this);
        this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(this.attrs),
                className: util_1.concat(exports.MENU, __1.getClassName(this.attrs), (this.attrs.ww && this.attrs.ww.hidden) ? hidden.HIDDEN : '', (this.attrs.ww && this.attrs.ww.block) ? orientation_1.BLOCK : '')
            },
            menu: {
                id: 'menu'
            },
            content: () => this.children
        };
    }
    isHidden() {
        return hidden.isHidden(this.view, this.values.root.wml.id);
    }
    hide() {
        hidden.hide(this.view, this.values.root.wml.id);
        return this;
    }
    show() {
        hidden.show(this.view, this.values.root.wml.id);
        return this;
    }
    toggle() {
        hidden.toggle(this.view, this.values.root.wml.id);
        return this;
    }
    setContent(content) {
        this.values.content = () => content;
        this.view.invalidate();
        this.show();
        return this;
    }
}
exports.Menu = Menu;
//# sourceMappingURL=index.js.map