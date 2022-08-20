"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropList = exports.DROP_LIST = exports.ItemSelectedEvent = void 0;
const views = require("./wml/drop-list");
const util_1 = require("../../util");
const size_1 = require("../../content/size");
const orientation_1 = require("../../content/orientation");
const results_menu_1 = require("../results-menu");
Object.defineProperty(exports, "ItemSelectedEvent", { enumerable: true, get: function () { return results_menu_1.ItemSelectedEvent; } });
const search_1 = require("../search");
const __1 = require("../../");
const __2 = require("../");
///classNames:begin
exports.DROP_LIST = 'ww-drop-list';
/**
 * DropList provides a control for making a selection from a list of choices.
 */
class DropList extends __2.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.DROP_LIST, __1.getClassName(this.attrs), (this.attrs.ww && this.attrs.ww.size) ?
                size_1.getSizeClassName(this.attrs.ww.size) : '', (this.attrs.ww && this.attrs.ww.block) ?
                orientation_1.BLOCK : ''),
            name: __2.getName(this.attrs),
            value: (this.attrs.ww && this.attrs.ww.value),
            control: {
                wml: {
                    id: 'drop-list'
                }
            },
            messages: {
                wml: {
                    id: 'messages'
                }
            },
            display: {
                disabled: (this.attrs.ww && this.attrs.ww.disabled),
                placeholder: () => {
                    if (this.attrs.ww) {
                        if (this.attrs.ww.options && this.values.value)
                            return getCurrent(this.attrs.ww.options, this.values.value);
                        return this.attrs.ww.placeholder || 'Select one';
                    }
                },
                onClick: () => {
                    this.toggle();
                }
            },
            menu: {
                wml: {
                    id: 'menu'
                },
                name: (this.attrs.ww && this.attrs.ww.name) ?
                    this.attrs.ww.name : '',
                block: (this.attrs.ww && this.attrs.ww.block) ?
                    this.attrs.ww.block : false,
                hidden: true,
                results: (this.attrs.ww && this.attrs.ww.options) ?
                    this.attrs.ww.options : [],
                onSelect: (e) => {
                    if (this.attrs.ww && this.attrs.ww.onSelect)
                        this.attrs.ww.onSelect(new results_menu_1.ItemSelectedEvent(e.name, e.value.value));
                    this.values.value = e.value.value;
                    this.view.invalidate();
                },
                itemTemplate: (this.attrs.ww && this.attrs.ww.itemTemplate) ?
                    this.attrs.ww.itemTemplate : undefined,
                noItemsTemplate: (this.attrs.ww && this.attrs.ww.noItemsTemplate) ?
                    this.attrs.ww.noItemsTemplate : undefined,
                stringifier: (this.attrs.ww && this.attrs.ww.stringifier) ?
                    this.attrs.ww.stringifier : (v) => v.label
            }
        };
    }
    /**
     * update changes the options available in the list.
     *
     * The view will be invalidated.
     */
    update(options) {
        this.values.menu.results = options;
        this.view.invalidate();
        return this;
    }
    /**
     * open the results menu.
     */
    open() {
        search_1.openMenu(this.view, this.values.menu.wml.id);
        return this;
    }
    /**
     * close the results menu.
     */
    close() {
        search_1.closeMenu(this.view, this.values.menu.wml.id);
        return this;
    }
    /**
     * toggle the results menu.
     */
    toggle() {
        search_1.toggleMenu(this.view, this.values.menu.wml.id);
        return this;
    }
}
exports.DropList = DropList;
const getCurrent = (opts, value, text = 'Select one') => opts.reduce((p, c) => c.value === value ? c.label : p, text);
//# sourceMappingURL=index.js.map