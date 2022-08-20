"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = exports.Divider = exports.ItemClickedEvent = exports.DIVIDER = exports.ITEM = void 0;
const wml = require("@quenk/wml");
const document = require("@quenk/wml/lib/dom");
const views = require("./wml/item");
const active_1 = require("../../content/state/active");
const active_2 = require("../../content/state/active");
const util_1 = require("../../util");
///classNames:begin
exports.ITEM = 'ww-menu-item';
exports.DIVIDER = 'ww-menu-divider';
/**
 * ItemClickedEvent is fired when the user clicks on an item in
 * a nav list.
 */
class ItemClickedEvent {
    constructor(name) {
        this.name = name;
    }
}
exports.ItemClickedEvent = ItemClickedEvent;
/**
 * Divider is used to add a horizontal line in place of an item to siginify a
 * new section.
 */
class Divider extends wml.Component {
    constructor() {
        super(...arguments);
        this.view = new views.DividerView(this);
        this.values = {
            className: exports.DIVIDER
        };
    }
}
exports.Divider = Divider;
/**
 * Item wraps content in a navigation list.
 *
 * Items should not have any siblings that are not other Items.
 */
class Item extends wml.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: (this.attrs.ww && this.attrs.ww.id) ? this.attrs.ww.id : '',
                className: util_1.concat(exports.ITEM, (this.attrs.ww && this.attrs.ww.active) ? active_2.ACTIVE : ''),
                content: {
                    render: () => {
                        if (this.attrs.ww && this.attrs.ww.text)
                            return [document.createTextNode(this.attrs.ww.text)];
                        else
                            return this.children;
                    }
                }
            }
        };
    }
    activate() {
        active_1.activate(this.view, this.values.root.wml.id);
        return this;
    }
    deactivate() {
        active_1.deactivate(this.view, this.values.root.wml.id);
        return this;
    }
}
exports.Item = Item;
//# sourceMappingURL=index.js.map