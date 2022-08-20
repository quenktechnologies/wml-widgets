"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drawer = exports.DRAWER_CONTENT = exports.DRAWER = void 0;
const hidden_1 = require("../../content/state/hidden");
const layout_1 = require("../../layout");
const util_1 = require("../../util");
const drawer_1 = require("./wml/drawer");
///classNames:begin
exports.DRAWER = 'ww-drawer';
exports.DRAWER_CONTENT = 'ww-drawer__content';
/**
 * Drawer provides a widget for displaying navigation and other sidebar content.
 *
 * It's api allows for toggling between hidden and shown states as well as
 * querying the current state.
 *
 * This widget's style intentionally gives it a high z-index so that it appears
 * in-front  of other content. Adjust the respective style variables to change.
 */
class Drawer extends layout_1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new drawer_1.Main(this);
        this.values = {
            root: {
                id: this.attrs.ww && this.attrs.ww.id,
                className: util_1.concat(exports.DRAWER, (this.attrs.ww && this.attrs.ww.hidden) ?
                    hidden_1.HIDDEN : ''),
                wml: {
                    id: 'root'
                }
            },
            content: {
                wml: {
                    id: 'content'
                },
                className: exports.DRAWER_CONTENT,
                value: (this.attrs.ww && this.attrs.ww.content) ?
                    this.attrs.ww.content : this.children
            }
        };
    }
    isHidden() {
        return hidden_1.isHidden(this.view, this.values.root.wml.id);
    }
    hide() {
        hidden_1.hide(this.view, this.values.root.wml.id);
        return this;
    }
    show() {
        hidden_1.show(this.view, this.values.root.wml.id);
        return this;
    }
    toggle() {
        hidden_1.toggle(this.view, this.values.root.wml.id);
        return this;
    }
}
exports.Drawer = Drawer;
//# sourceMappingURL=index.js.map