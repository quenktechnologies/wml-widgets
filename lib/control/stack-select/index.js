"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackSelect = exports.ItemsChangedEvent = exports.STACK_SELECT = exports.TermChangedEvent = void 0;
const views = require("./wml/stack-select");
const orientation_1 = require("../../content/orientation");
const form_1 = require("../form");
const search_1 = require("../search");
Object.defineProperty(exports, "TermChangedEvent", { enumerable: true, get: function () { return search_1.TermChangedEvent; } });
const select_1 = require("../select");
const util_1 = require("../../util");
const __1 = require("../../");
const __2 = require("../");
const feedback_1 = require("../feedback");
///classNames:begin
exports.STACK_SELECT = 'ww-stack-select';
/**
 * ItemsChangedEvent
 */
class ItemsChangedEvent extends __2.Event {
}
exports.ItemsChangedEvent = ItemsChangedEvent;
/**
 * StackSelect provides a control for allowing a user to select
 * multiple items from a list.
 *
 * It use a stack to display the selected items.
 *
 *     +=========================+
 *     |  <select>               |
 *     +=========================+
 *     +-------------------------+
 *     |   <item>              x |
 *     +-------------------------+
 *     +-------------------------+
 *     |   <item>              x |
 *     +-------------------------+
 *     +-------------------------+
 *     |   <item>              x |
 *     +-------------------------+
 */
class StackSelect extends form_1.AbstractFormControl {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: (0, __1.getId)(this.attrs),
                className: (0, util_1.concat)(exports.STACK_SELECT, (0, __1.getClassName)(this.attrs), (0, feedback_1.getValidityClassName)(this.attrs), (this.attrs && this.attrs.block) ? orientation_1.BLOCK : ''),
                dir: (this.attrs && this.attrs.dir) ?
                    this.attrs.dir : 1
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
                name: (this.attrs && this.attrs.name) ?
                    this.attrs.name : '',
                value: undefined,
                block: true,
                disabled: (this.attrs && this.attrs.disabled) ?
                    this.attrs.disabled : false,
                placeholder: (this.attrs && this.attrs.placeholder) || '',
                onSearch: (evt) => {
                    if (this.attrs && this.attrs.onSearch)
                        this.attrs.onSearch(evt);
                },
                onSelect: ({ value }) => this.push(value)
            },
            messages: {
                wml: {
                    id: 'message'
                },
                text: (0, feedback_1.getMessage)(this.attrs)
            },
            stack: {
                wml: {
                    id: 'stack'
                },
                name: (0, __2.getName)(this.attrs),
                disabled: (this.attrs && this.attrs.disabled) ?
                    this.attrs.disabled : false,
                value: (this.attrs && this.attrs.value) ?
                    this.attrs.value : [],
                decorator: (this.attrs && this.attrs.stringifier) ?
                    this.attrs.stringifier : (v) => String(v),
                onChange: (e) => {
                    if (this.attrs && this.attrs.onChange)
                        this.attrs.onChange(e);
                }
            }
        };
    }
    setMessage(msg) {
        (0, form_1.setMessage)(this.view, this.values.messages.wml.id, msg);
        return this;
    }
    removeMessage() {
        (0, form_1.removeMessage)(this.view, this.values.messages.wml.id);
        return this;
    }
    /**
     * update the list of available options displayed to the user.
     */
    update(list) {
        (0, select_1.update)(this.view, this.values.search.wml.id, list);
        return this;
    }
    /**
     * push a value onto the stack.
     */
    push(v) {
        this
            .view
            .findById(this.values.stack.wml.id)
            .map(s => s.push(v));
        return this;
    }
}
exports.StackSelect = StackSelect;
//# sourceMappingURL=index.js.map