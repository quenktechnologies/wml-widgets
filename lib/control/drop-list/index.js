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
            id: (0, __1.getId)(this.attrs),
            className: (0, util_1.concat)(exports.DROP_LIST, (0, __1.getClassName)(this.attrs), (this.attrs && this.attrs.size) ?
                (0, size_1.getSizeClassName)(this.attrs.size) : '', (this.attrs && this.attrs.block) ?
                orientation_1.BLOCK : ''),
            name: (0, __2.getName)(this.attrs),
            value: (this.attrs && this.attrs.value),
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
                disabled: (this.attrs && this.attrs.disabled),
                placeholder: () => {
                    if (this.attrs) {
                        if (this.attrs.options && this.values.value)
                            return getCurrent(this.attrs.options, this.values.value);
                        return this.attrs.placeholder || 'Select one';
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
                name: (this.attrs && this.attrs.name) ?
                    this.attrs.name : '',
                block: (this.attrs && this.attrs.block) ?
                    this.attrs.block : false,
                hidden: true,
                results: (this.attrs && this.attrs.options) ?
                    this.attrs.options : [],
                onSelect: (e) => {
                    if (this.attrs && this.attrs.onSelect)
                        this.attrs.onSelect(new results_menu_1.ItemSelectedEvent(e.name, e.value.value));
                    this.values.value = e.value.value;
                    this.view.invalidate();
                },
                itemTemplate: (this.attrs && this.attrs.itemTemplate) ?
                    this.attrs.itemTemplate : undefined,
                noItemsTemplate: (this.attrs && this.attrs.noItemsTemplate) ?
                    this.attrs.noItemsTemplate : undefined,
                stringifier: (this.attrs && this.attrs.stringifier) ?
                    this.attrs.stringifier : (v) => v.label
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
        (0, search_1.openMenu)(this.view, this.values.menu.wml.id);
        return this;
    }
    /**
     * close the results menu.
     */
    close() {
        (0, search_1.closeMenu)(this.view, this.values.menu.wml.id);
        return this;
    }
    /**
     * toggle the results menu.
     */
    toggle() {
        (0, search_1.toggleMenu)(this.view, this.values.menu.wml.id);
        return this;
    }
}
exports.DropList = DropList;
const getCurrent = (opts, value, text = 'Select one') => opts.reduce((p, c) => c.value === value ? c.label : p, text);
//# sourceMappingURL=index.js.map