"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListLayout = exports.ListLayoutItem = exports.LIST_LAYOUT_ITEM = exports.LIST_LAYOUT = void 0;
const views = require("./wml/list");
const util_1 = require("../../util");
const active_1 = require("../../content/state/active");
const __1 = require("../");
///classNames:begin
exports.LIST_LAYOUT = 'ww-list-layout';
exports.LIST_LAYOUT_ITEM = 'ww-list-layout__item';
/**
 * ListLayoutItem
 */
class ListLayoutItem extends __1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new views.ListLayoutItem(this);
        this.values = {
            content: {
                wml: {
                    id: 'item'
                },
                id: (this.attrs.ww && this.attrs.ww.id) ? this.attrs.ww.id : '',
                className: util_1.concat(exports.LIST_LAYOUT_ITEM, (this.attrs.ww && this.attrs.ww.active) ? active_1.ACTIVE : ''),
                name: (this.attrs.ww && this.attrs.ww.name) ? this.attrs.ww.name : '',
                onclick: () => {
                    if (this.attrs.ww && this.attrs.ww.onClick)
                        this.attrs.ww.onClick(this.attrs.ww &&
                            this.attrs.ww.name || '');
                }
            }
        };
    }
    isActive() {
        return active_1.isActive(this.view, this.values.content.wml.id);
    }
    activate() {
        active_1.activate(this.view, this.values.content.wml.id);
        return this;
    }
    deactivate() {
        active_1.deactivate(this.view, this.values.content.wml.id);
        return this;
    }
    toggleActive() {
        if (this.isActive())
            this.deactivate();
        else
            this.activate();
        return this;
    }
}
exports.ListLayoutItem = ListLayoutItem;
/**
 * ListLayout is used to create a vertical list of content.
 *
 * Children must be ListGroupItems.
 */
class ListLayout extends __1.AbstractLayout {
    constructor() {
        super(...arguments);
        this.view = new views.ListLayout(this);
        this.values = {
            content: {
                wml: {
                    id: 'list'
                },
                id: this.attrs.ww && this.attrs.ww.id,
                className: util_1.concat(exports.LIST_LAYOUT, __1.LAYOUT, (this.attrs.ww && this.attrs.ww.className) ?
                    this.attrs.ww.className : '')
            }
        };
    }
}
exports.ListLayout = ListLayout;
//# sourceMappingURL=index.js.map