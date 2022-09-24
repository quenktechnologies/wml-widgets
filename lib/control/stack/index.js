"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = exports.StackChangedEvent = exports.STACK_CLOSE_BUTTON = exports.STACK_ELEMENT_CONTENT = exports.STACK_ELEMENT = exports.STACK = void 0;
const views = require("./wml/stack");
const dom_1 = require("@quenk/wml/lib/dom");
const util_1 = require("../../util");
const __1 = require("../../");
const __2 = require("../");
///classNames:begin
exports.STACK = 'ww-stack';
exports.STACK_ELEMENT = 'ww-stack__element';
exports.STACK_ELEMENT_CONTENT = 'ww-stack__element__content';
exports.STACK_CLOSE_BUTTON = 'ww-stack__button';
/**
 * StackChangedEvent is generated when the user removes an item from the stack.
 */
class StackChangedEvent extends __2.Event {
}
exports.StackChangedEvent = StackChangedEvent;
/**
 * Stack displays a list of items that can be modified
 * by releasing one or more at a time.
 */
class Stack extends __2.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                id: (0, __1.getId)(this.attrs),
                className: (0, util_1.concat)(exports.STACK, (0, __1.getClassName)(this.attrs)),
                disabled: (this.attrs && this.attrs.disabled) ?
                    this.attrs.disabled : false,
                value: (this.attrs && this.attrs.value) ?
                    this.attrs.value : [],
                fire: () => {
                    if (!this.values.root.disabled) {
                        if (this.attrs && this.attrs.onChange)
                            this.attrs.onChange(new StackChangedEvent(this.attrs.name, this.values.root.value.slice()));
                        this.view.invalidate();
                    }
                }
            },
            element: {
                className: exports.STACK_ELEMENT,
                template: (v, idx) => (this.attrs && this.attrs.elementTemplate) ?
                    this.attrs.elementTemplate(this)(v)(idx)(this.view) :
                    views.content(this, v, idx)(this.view),
                content: {
                    className: exports.STACK_ELEMENT_CONTENT
                },
                close: (index) => () => {
                    this.values.root.value.splice(Number(index), 1);
                    this.values.root.fire();
                },
                decorator: (v) => (0, dom_1.text)((this.attrs && this.attrs.decorator) ?
                    this.attrs.decorator(v) : v + '')
            },
            close: {
                className: exports.STACK_CLOSE_BUTTON
            }
        };
    }
    /**
     * push a new member onto the stack.
     */
    push(value) {
        this.values.root.value.push(value);
        this.values.root.fire();
        return this;
    }
}
exports.Stack = Stack;
//# sourceMappingURL=index.js.map