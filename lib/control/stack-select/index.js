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
exports.StackSelect = exports.ItemsChangedEvent = exports.STACK_SELECT = exports.TermChangedEvent = void 0;
var views = require("./wml/stack-select");
var orientation_1 = require("../../content/orientation");
var form_1 = require("../form");
var search_1 = require("../search");
Object.defineProperty(exports, "TermChangedEvent", { enumerable: true, get: function () { return search_1.TermChangedEvent; } });
var select_1 = require("../select");
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
var feedback_1 = require("../feedback");
///classNames:begin
exports.STACK_SELECT = 'ww-stack-select';
/**
 * ItemsChangedEvent
 */
var ItemsChangedEvent = /** @class */ (function (_super) {
    __extends(ItemsChangedEvent, _super);
    function ItemsChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemsChangedEvent;
}(__2.Event));
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
var StackSelect = /** @class */ (function (_super) {
    __extends(StackSelect, _super);
    function StackSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.STACK_SELECT, __1.getClassName(_this.attrs), feedback_1.getValidityClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.block) ? orientation_1.BLOCK : ''),
                dir: (_this.attrs.ww && _this.attrs.ww.dir) ?
                    _this.attrs.ww.dir : 1
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
                text: form_1.getLabel(_this.attrs)
            },
            search: {
                wml: {
                    id: 'search'
                },
                name: (_this.attrs.ww && _this.attrs.ww.name) ?
                    _this.attrs.ww.name : '',
                value: undefined,
                block: true,
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ?
                    _this.attrs.ww.disabled : false,
                placeholder: (_this.attrs.ww && _this.attrs.ww.placeholder) || '',
                onSearch: function (evt) {
                    if (_this.attrs.ww && _this.attrs.ww.onSearch)
                        _this.attrs.ww.onSearch(evt);
                },
                onSelect: function (_a) {
                    var value = _a.value;
                    return _this.push(value);
                }
            },
            messages: {
                wml: {
                    id: 'message'
                },
                text: feedback_1.getMessage(_this.attrs)
            },
            stack: {
                wml: {
                    id: 'stack'
                },
                name: __2.getName(_this.attrs),
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ?
                    _this.attrs.ww.disabled : false,
                value: (_this.attrs.ww && _this.attrs.ww.value) ?
                    _this.attrs.ww.value : [],
                decorator: (_this.attrs.ww && _this.attrs.ww.stringifier) ?
                    _this.attrs.ww.stringifier : function (v) { return String(v); },
                onChange: function (e) {
                    if (_this.attrs.ww && _this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(e);
                }
            }
        };
        return _this;
    }
    StackSelect.prototype.setMessage = function (msg) {
        form_1.setMessage(this.view, this.values.messages.wml.id, msg);
        return this;
    };
    StackSelect.prototype.removeMessage = function () {
        form_1.removeMessage(this.view, this.values.messages.wml.id);
        return this;
    };
    /**
     * update the list of available options displayed to the user.
     */
    StackSelect.prototype.update = function (list) {
        select_1.update(this.view, this.values.search.wml.id, list);
        return this;
    };
    /**
     * push a value onto the stack.
     */
    StackSelect.prototype.push = function (v) {
        this
            .view
            .findById(this.values.stack.wml.id)
            .map(function (s) { return s.push(v); });
        return this;
    };
    return StackSelect;
}(form_1.AbstractFormControl));
exports.StackSelect = StackSelect;
//# sourceMappingURL=index.js.map