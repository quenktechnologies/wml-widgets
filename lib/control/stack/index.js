"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/stack");
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
///classNames:begin
exports.STACK = 'ww-stack';
exports.STACK_ELEMENT = 'ww-stack__element';
exports.STACK_ELEMENT_CONTENT = 'ww-stack__element__content';
exports.STACK_CLOSE_BUTTON = 'ww-stack__button';
/**
 * StackChangedEvent is generated when the user removes an item from the stack.
 */
var StackChangedEvent = /** @class */ (function (_super) {
    __extends(StackChangedEvent, _super);
    function StackChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StackChangedEvent;
}(__2.Event));
exports.StackChangedEvent = StackChangedEvent;
/**
 * Stack displays a list of items that can be modified
 * by releasing one or more at a time.
 */
var Stack = /** @class */ (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.STACK, __1.getClassName(_this.attrs)),
                value: (_this.attrs.ww && _this.attrs.ww.value) ?
                    _this.attrs.ww.value : [],
                fire: function () {
                    if (_this.attrs.ww && _this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(new StackChangedEvent(_this.attrs.ww.name, _this.values.root.value.slice()));
                    _this.view.invalidate();
                }
            },
            element: {
                className: exports.STACK_ELEMENT,
                template: function (v, idx) {
                    return (_this.attrs.ww && _this.attrs.ww.elementTemplate) ?
                        _this.attrs.ww.elementTemplate(_this)(v)(idx)(_this.view) :
                        views.content(_this, v, idx)(_this.view);
                },
                content: {
                    className: exports.STACK_ELEMENT_CONTENT
                },
                close: function (index) { return function () {
                    _this.values.root.value.splice(Number(index), 1);
                    _this.values.root.fire();
                }; },
                decorator: function (v) {
                    return __1.text((_this.attrs.ww && _this.attrs.ww.decorator) ?
                        _this.attrs.ww.decorator(v) : v + '');
                }
            },
            close: {
                className: exports.STACK_CLOSE_BUTTON
            }
        };
        return _this;
    }
    /**
     * push a new member onto the stack.
     */
    Stack.prototype.push = function (value) {
        this.values.root.value.push(value);
        this.values.root.fire();
        return this;
    };
    return Stack;
}(__2.AbstractControl));
exports.Stack = Stack;
//# sourceMappingURL=index.js.map