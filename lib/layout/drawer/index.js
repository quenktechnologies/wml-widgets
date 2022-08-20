"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawerLayout = exports.DRAWER_LAYOUT_CONTENT = exports.DRAWER_LAYOUT = void 0;
const wml_1 = require("@quenk/wml");
const array_1 = require("@quenk/noni/lib/data/array");
const util_1 = require("../../util");
const __1 = require("../");
const view_1 = require("./view");
///classNames:begin
exports.DRAWER_LAYOUT = 'ww-drawer-layout';
exports.DRAWER_LAYOUT_CONTENT = 'ww-drawer-layout__content';
/**
 * DrawerLayout provides a 2 column layout for an application where the first
 * column is an optionally displayed menu "drawer" and the second used for
 * regular application content.
 *
 * Methods exists to open or close the drawer as well as replace the content
 * displayed in the second column as desired.
  */
class DrawerLayout extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new view_1.DrawerLayoutView(this);
        this.values = {
            wml: { id: 'layout' },
            id: this.attrs.id,
            className: util_1.concat(exports.DRAWER_LAYOUT, __1.LAYOUT, this.attrs.className),
            content: {
                wml: { id: 'content' },
                className: util_1.concat(exports.DRAWER_LAYOUT_CONTENT, __1.LAYOUT),
                content: getContent(this.children, this.attrs.drawer),
                persist: (this.attrs.persist || '').split(',').filter(id => id)
            },
            drawer: {
                wml: { id: 'drawer' },
                hidden: !this.attrs.open,
                content: getDrawer(this.children, this.attrs.drawer)
            }
        };
    }
    get _drawer() {
        return util_1.getById(this.view, this.values.drawer.wml.id).get();
    }
    get _content() {
        let content = util_1.getById(this.view, this.values.content.wml.id).get();
        if (this.attrs.content)
            return content.querySelector(`#${this.attrs.content}`);
        else
            return content;
    }
    /**
     * isOpen indicates whether the drawer part of the layout is open.
     */
    isOpen() {
        return !this._drawer.isHidden();
    }
    /**
     * open the drawer part of the layout.
     */
    open() {
        this._drawer.show();
    }
    /**
     * close the drawer part of the layout.
     */
    close() {
        this._drawer.hide();
    }
    /**
     * toggle the state of the drawer part of the layout.
     */
    toggle() {
        if (this.isOpen())
            this.close();
        else
            this.open();
    }
    setContent(frag) {
        this.removeContent();
        let content = this._content;
        frag.forEach(child => content.appendChild(child));
        return this;
    }
    removeContent() {
        let content = this._content;
        for (let i = 0; i < content.children.length; i++) {
            let child = content.children[i];
            if (!array_1.contains(this.values.content.persist, child.id))
                content.removeChild(child);
        }
        return this;
    }
}
exports.DrawerLayout = DrawerLayout;
const getDrawer = (children, id) => array_1.find(children, (el) => el.id === id)
    .map((el) => [el])
    .orJust(() => [])
    .get();
const getContent = (children, id) => children.filter(child => child.id !== id);
//# sourceMappingURL=index.js.map