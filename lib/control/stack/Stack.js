"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wml = require("@quenk/wml");
var names = require("@package/self/common/names");
var views = require("./wml/stack");
var StackChangedEvent_1 = require("./StackChangedEvent");
/**
 * Stack displays a list of items that can be modified
 * by releasing one or more at a time.
 */
var Stack = /** @class */ (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.template = _this.attrs.ww.template ?
            _this.attrs.ww.template : views.content;
        _this.values = {
            id: {
                root: 'root',
                a: 'link'
            },
            class: {
                root: names.STACK,
                close: names.STACK_CLOSE,
                member: names.STACK_MEMBER
            },
            item: {
                template: _this.template,
                close: function (index) { return function () {
                    _this.values.value.splice(Number(index), 1);
                    _this.fire();
                }; },
                decorator: _this.attrs.ww.decorator ? _this.attrs.ww.decorator : function (m) { return String(m); }
            },
            value: _this.attrs.ww.value ? _this.attrs.ww.value : []
        };
        return _this;
    }
    /**
     * push a new member onto the stack.
     */
    Stack.prototype.push = function (m) {
        this.values.value.push(m);
        this.fire();
        return this;
    };
    Stack.prototype.fire = function () {
        if (this.attrs.ww.onChange)
            this.attrs.ww.onChange(new StackChangedEvent_1.StackChangedEvent(this.attrs.ww.name, this.values.value.slice()));
        this.view.invalidate();
    };
    return Stack;
}(wml.Component));
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map