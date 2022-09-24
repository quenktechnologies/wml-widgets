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
                id: (this.attrs && this.attrs.id) ? this.attrs.id : '',
                className: (0, util_1.concat)(exports.LIST_LAYOUT_ITEM, (this.attrs && this.attrs.active) ? active_1.ACTIVE : ''),
                name: (this.attrs && this.attrs.name) ? this.attrs.name : '',
                onclick: () => {
                    if (this.attrs && this.attrs.onClick)
                        this.attrs.onClick(this.attrs &&
                            this.attrs.name || '');
                }
            }
        };
    }
    isActive() {
        return (0, active_1.isActive)(this.view, this.values.content.wml.id);
    }
    activate() {
        (0, active_1.activate)(this.view, this.values.content.wml.id);
        return this;
    }
    deactivate() {
        (0, active_1.deactivate)(this.view, this.values.content.wml.id);
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
                id: this.attrs && this.attrs.id,
                className: (0, util_1.concat)(exports.LIST_LAYOUT, __1.LAYOUT, (this.attrs && this.attrs.className) ?
                    this.attrs.className : '')
            }
        };
    }
}
exports.ListLayout = ListLayout;
//# sourceMappingURL=index.js.map