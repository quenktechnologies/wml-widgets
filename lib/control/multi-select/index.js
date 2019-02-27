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
var views = require("./wml/multi-select");
var util_1 = require("../../util");
var __1 = require("../");
var feedback_1 = require("../feedback");
var select_1 = require("../select");
exports.TermChangedEvent = select_1.TermChangedEvent;
var __2 = require("../../");
var __3 = require("../");
///classNames:begin
exports.MULTI_SELECT = 'ww-multi-select';
/**
 * ItemsChangedEvent
 */
var ItemsChangedEvent = /** @class */ (function (_super) {
    __extends(ItemsChangedEvent, _super);
    function ItemsChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemsChangedEvent;
}(__1.Event));
exports.ItemsChangedEvent = ItemsChangedEvent;
/**
 * MultiSelect provides a control for allowing a user to select
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
var MultiSelect = /** @class */ (function (_super) {
    __extends(MultiSelect, _super);
    function MultiSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __2.getId(_this.attrs),
                className: util_1.concat(exports.MULTI_SELECT, __2.getClassName(_this.attrs))
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
                text: (_this.attrs.ww && _this.attrs.ww.label) ?
                    _this.attrs.ww.label : ''
            },
            search: {
                wml: {
                    id: 'search'
                },
                name: (_this.attrs.ww && _this.attrs.ww.name) ?
                    _this.attrs.ww.name : '',
                value: undefined,
                onSearch: function (evt) {
                    if (_this.attrs.ww && _this.attrs.ww.onSearch)
                        _this.attrs.ww.onSearch(evt);
                },
                onChange: function (_a) {
                    var value = _a.value;
                    return _this.push(value);
                }
            },
            messages: {
                wml: {
                    id: 'message'
                }
            },
            stack: {
                wml: {
                    id: 'stack'
                },
                name: __3.getName(_this.attrs),
                value: (_this.attrs.ww && _this.attrs.ww.value) ?
                    _this.attrs.ww.value : [],
                decorator: (_this.attrs.ww && _this.attrs.ww.decorator) ?
                    _this.attrs.ww.decorator : function (v) { return String(v); },
                onChange: function (e) {
                    if (_this.attrs.ww && _this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(e);
                }
            }
        };
        return _this;
    }
    /**
     * update the list of available options displayed to the user.
     */
    MultiSelect.prototype.update = function (list) {
        this
            .view
            .findById(this.values.search.wml.id)
            .map(function (s) { return s.update(list); });
        return this;
    };
    /**
     * push a value onto the stack.
     */
    MultiSelect.prototype.push = function (v) {
        this
            .view
            .findById(this.values.stack.wml.id)
            .map(function (s) { return s.push(v); });
        return this;
    };
    return MultiSelect;
}(feedback_1.AbstractFeedbackControl));
exports.MultiSelect = MultiSelect;
//# sourceMappingURL=index.js.map