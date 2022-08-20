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
                id: __1.getId(this.attrs),
                className: util_1.concat(exports.STACK_SELECT, __1.getClassName(this.attrs), feedback_1.getValidityClassName(this.attrs), (this.attrs.ww && this.attrs.ww.block) ? orientation_1.BLOCK : ''),
                dir: (this.attrs.ww && this.attrs.ww.dir) ?
                    this.attrs.ww.dir : 1
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
                text: form_1.getLabel(this.attrs)
            },
            search: {
                wml: {
                    id: 'search'
                },
                name: (this.attrs.ww && this.attrs.ww.name) ?
                    this.attrs.ww.name : '',
                value: undefined,
                block: true,
                disabled: (this.attrs.ww && this.attrs.ww.disabled) ?
                    this.attrs.ww.disabled : false,
                placeholder: (this.attrs.ww && this.attrs.ww.placeholder) || '',
                onSearch: (evt) => {
                    if (this.attrs.ww && this.attrs.ww.onSearch)
                        this.attrs.ww.onSearch(evt);
                },
                onSelect: ({ value }) => this.push(value)
            },
            messages: {
                wml: {
                    id: 'message'
                },
                text: feedback_1.getMessage(this.attrs)
            },
            stack: {
                wml: {
                    id: 'stack'
                },
                name: __2.getName(this.attrs),
                disabled: (this.attrs.ww && this.attrs.ww.disabled) ?
                    this.attrs.ww.disabled : false,
                value: (this.attrs.ww && this.attrs.ww.value) ?
                    this.attrs.ww.value : [],
                decorator: (this.attrs.ww && this.attrs.ww.stringifier) ?
                    this.attrs.ww.stringifier : (v) => String(v),
                onChange: (e) => {
                    if (this.attrs.ww && this.attrs.ww.onChange)
                        this.attrs.ww.onChange(e);
                }
            }
        };
    }
    setMessage(msg) {
        form_1.setMessage(this.view, this.values.messages.wml.id, msg);
        return this;
    }
    removeMessage() {
        form_1.removeMessage(this.view, this.values.messages.wml.id);
        return this;
    }
    /**
     * update the list of available options displayed to the user.
     */
    update(list) {
        select_1.update(this.view, this.values.search.wml.id, list);
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