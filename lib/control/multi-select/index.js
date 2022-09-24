"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSelect = exports.ItemsChangedEvent = exports.DEFAULT_FONT_INCREMENT = exports.DEFAULT_INPUT_WIDTH = exports.MULTI_SELECT_TAG = exports.MULTI_SELECT_INPUT = exports.MULTI_SELECT_CONTENT = exports.MULTI_SELECT = exports.TermChangedEvent = void 0;
const views = require("./wml/multi-select");
const orientation_1 = require("../../content/orientation");
const form_1 = require("../form");
const search_1 = require("../search");
Object.defineProperty(exports, "TermChangedEvent", { enumerable: true, get: function () { return search_1.TermChangedEvent; } });
const util_1 = require("../../util");
const __1 = require("../../");
const __2 = require("../");
const feedback_1 = require("../feedback");
const active_1 = require("../../content/state/active");
const disabled_1 = require("../../content/state/disabled");
///classNames:begin
exports.MULTI_SELECT = 'ww-multi-select';
exports.MULTI_SELECT_CONTENT = 'ww-multi-select__content';
exports.MULTI_SELECT_INPUT = 'ww-multi-select__input';
exports.MULTI_SELECT_TAG = 'ww-multi-select__tag';
///classNames:end
exports.DEFAULT_INPUT_WIDTH = 50;
exports.DEFAULT_FONT_INCREMENT = 7;
/**
 * ItemsChangedEvent
 */
class ItemsChangedEvent extends __2.Event {
}
exports.ItemsChangedEvent = ItemsChangedEvent;
/**
 * MultiSelect
 */
class MultiSelect extends form_1.AbstractFormControl {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                disabled: (this.attrs && this.attrs.disabled) ?
                    this.attrs.disabled : false,
                id: (0, __1.getId)(this.attrs),
                className: (0, util_1.concat)(exports.MULTI_SELECT, (0, __1.getClassName)(this.attrs), (0, feedback_1.getValidityClassName)(this.attrs), (0, orientation_1.getBlockClassName)(this.attrs), (this.attrs && this.attrs.disabled) ?
                    disabled_1.DISABLED : '')
            },
            control: {
                wml: {
                    id: 'root'
                }
            },
            label: {
                wml: {
                    id: 'label'
                },
                text: (0, form_1.getLabel)(this.attrs)
            },
            search: {
                wml: {
                    id: 'search'
                },
                block: this.attrs && this.attrs.block || undefined,
                itemTemplate: (this.attrs && this.attrs.itemTemplate) ?
                    this.attrs.itemTemplate : undefined,
                noItemsTemplate: (this.attrs && this.attrs.noItemsTemplate) ?
                    this.attrs.noItemsTemplate : undefined,
                onSearch: (evt) => {
                    if (this.attrs && this.attrs.onSearch)
                        this.attrs.onSearch(evt);
                },
                onSelect: ({ value }) => {
                    this.push(value);
                    this.fireChange();
                    this.redraw();
                }
            },
            messages: {
                wml: {
                    id: 'message'
                },
                text: (0, feedback_1.getMessage)(this.attrs)
            },
            content: {
                className: exports.MULTI_SELECT_CONTENT,
                onfocus: () => this.focus()
            },
            tags: {
                className: (0, util_1.concat)(exports.MULTI_SELECT_TAG, (0, feedback_1.getValidityClassName)(this.attrs)),
                value: (this.attrs && this.attrs.value) ?
                    this.attrs.value : [],
                disabled: (this.attrs && this.attrs.disabled) ?
                    this.attrs.disabled : false,
                has: () => this.values.tags.value.length > 0,
                getText: (this.attrs && this.attrs.stringifier) ?
                    this.attrs.stringifier : (v) => String(v),
                onDismiss: (e) => {
                    let idx = Number(e.name);
                    this.values.tags.value.splice(idx, 1);
                    this.fireChange();
                    this.redraw();
                }
            },
            input: {
                wml: {
                    id: 'input'
                },
                className: exports.MULTI_SELECT_INPUT,
                name: (0, __2.getName)(this.attrs),
                inputWidth: (this.attrs && this.attrs.inputWidth) ?
                    this.attrs.inputWidth : exports.DEFAULT_INPUT_WIDTH,
                fontIncrement: (this.attrs && this.attrs.fontIncrement) ?
                    this.attrs.fontIncrement : exports.DEFAULT_FONT_INCREMENT,
                disabled: (this.attrs && this.attrs.disabled) ?
                    this.attrs.disabled : undefined,
                onSearch: (e) => {
                    if (!this.values.root.disabled) {
                        this.grow(e.value.length + 1);
                        if (this.attrs && this.attrs.onSearch)
                            this.attrs.onSearch(e);
                    }
                }
            },
            menu: {
                wml: { id: 'menu' },
                name: (0, __2.getName)(this.attrs),
                block: true,
                onSelect: (e) => {
                    this.close();
                    this.values.tags.value.push(e.value);
                    this.fireChange();
                    this.redraw();
                },
                itemTemplate: (this.attrs && this.attrs.itemTemplate) ?
                    this.attrs.itemTemplate : undefined,
                noItemsTemplate: (this.attrs && this.attrs.noItemsTemplate) ?
                    this.attrs.noItemsTemplate : undefined,
                stringifier: (this.attrs && this.attrs.stringifier) ?
                    this.attrs.stringifier : undefined
            }
        };
    }
    /**
     * @private
     */
    fireChange() {
        if (this.attrs && this.attrs.onChange)
            this.attrs.onChange(new ItemsChangedEvent((0, __2.getName)(this.attrs), this.values.tags.value.slice()));
    }
    /**
     * @private
     */
    grow(n) {
        let mInput = (0, util_1.getById)(this.view, this.values.input.wml.id);
        if (mInput.isNothing())
            return;
        let i = mInput.get();
        let mDom = (0, util_1.getById)(i.view, i.values.wml.id);
        if (mDom.isNothing())
            return;
        let dom = mDom.get();
        dom.style.width = `${n * this.values.input.fontIncrement}px`;
    }
    /**
     * @private
     */
    redraw() {
        this.view.invalidate();
        this.focus();
        return this;
    }
    setMessage(msg) {
        (0, form_1.setMessage)(this.view, this.values.messages.wml.id, msg);
        return this;
    }
    removeMessage() {
        (0, form_1.removeMessage)(this.view, this.values.messages.wml.id);
        return this;
    }
    update(results) {
        (0, search_1.updateMenu)(this.view, this.values.menu.wml.id, results);
        return this;
    }
    open() {
        (0, search_1.openMenu)(this.view, this.values.menu.wml.id);
        return this;
    }
    close() {
        (0, search_1.closeMenu)(this.view, this.values.menu.wml.id);
        return this;
    }
    focus() {
        getInput(this).map(i => i.focus());
        getRoot(this).map(e => e.classList.add(active_1.ACTIVE));
        return this;
    }
    /**
     * push a value onto the end of the internal stack.
     */
    push(value) {
        this.values.tags.value.push(value);
        this.fireChange();
        return this;
    }
}
exports.MultiSelect = MultiSelect;
const getInput = (m) => (0, util_1.getById)(m.view, m.values.input.wml.id);
const getRoot = (m) => (0, util_1.getById)(m.view, m.values.root.wml.id);
//# sourceMappingURL=index.js.map