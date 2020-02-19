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
var views = require("./wml/multi-select");
var orientation_1 = require("../../content/orientation");
var form_1 = require("../form");
var search_1 = require("../search");
exports.TermChangedEvent = search_1.TermChangedEvent;
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
var feedback_1 = require("../feedback");
var active_1 = require("../../content/state/active");
var disabled_1 = require("../../content/state/disabled");
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
var ItemsChangedEvent = /** @class */ (function (_super) {
    __extends(ItemsChangedEvent, _super);
    function ItemsChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemsChangedEvent;
}(__2.Event));
exports.ItemsChangedEvent = ItemsChangedEvent;
/**
 * MultiSelect
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
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ?
                    _this.attrs.ww.disabled : false,
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.MULTI_SELECT, __1.getClassName(_this.attrs), feedback_1.getValidityClassName(_this.attrs), orientation_1.getBlockClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.disabled) ?
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
                text: form_1.getLabel(_this.attrs)
            },
            search: {
                wml: {
                    id: 'search'
                },
                block: _this.attrs.ww && _this.attrs.ww.block || undefined,
                itemTemplate: (_this.attrs.ww && _this.attrs.ww.itemTemplate) ?
                    _this.attrs.ww.itemTemplate : undefined,
                noItemsTemplate: (_this.attrs.ww && _this.attrs.ww.noItemsTemplate) ?
                    _this.attrs.ww.noItemsTemplate : undefined,
                onSearch: function (evt) {
                    if (_this.attrs.ww && _this.attrs.ww.onSearch)
                        _this.attrs.ww.onSearch(evt);
                },
                onSelect: function (_a) {
                    var value = _a.value;
                    _this.push(value);
                    _this.fireChange();
                    _this.redraw();
                }
            },
            messages: {
                wml: {
                    id: 'message'
                },
                text: feedback_1.getMessage(_this.attrs)
            },
            content: {
                className: exports.MULTI_SELECT_CONTENT,
                onfocus: function () { return _this.focus(); }
            },
            tags: {
                className: util_1.concat(exports.MULTI_SELECT_TAG, feedback_1.getValidityClassName(_this.attrs)),
                value: (_this.attrs.ww && _this.attrs.ww.value) ?
                    _this.attrs.ww.value : [],
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ?
                    _this.attrs.ww.disabled : false,
                has: function () { return _this.values.tags.value.length > 0; },
                getText: (_this.attrs.ww && _this.attrs.ww.stringifier) ?
                    _this.attrs.ww.stringifier : function (v) { return String(v); },
                onDismiss: function (e) {
                    var idx = Number(e.name);
                    _this.values.tags.value.splice(idx, 1);
                    _this.fireChange();
                    _this.redraw();
                }
            },
            input: {
                wml: {
                    id: 'input'
                },
                className: exports.MULTI_SELECT_INPUT,
                name: __2.getName(_this.attrs),
                inputWidth: (_this.attrs.ww && _this.attrs.ww.inputWidth) ?
                    _this.attrs.ww.inputWidth : exports.DEFAULT_INPUT_WIDTH,
                fontIncrement: (_this.attrs.ww && _this.attrs.ww.fontIncrement) ?
                    _this.attrs.ww.fontIncrement : exports.DEFAULT_FONT_INCREMENT,
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ?
                    _this.attrs.ww.disabled : undefined,
                onSearch: function (e) {
                    if (!_this.values.root.disabled) {
                        _this.grow(e.value.length + 1);
                        if (_this.attrs.ww && _this.attrs.ww.onSearch)
                            _this.attrs.ww.onSearch(e);
                    }
                }
            },
            menu: {
                wml: { id: 'menu' },
                name: __2.getName(_this.attrs),
                block: true,
                onSelect: function (e) {
                    _this.close();
                    _this.values.tags.value.push(e.value);
                    _this.fireChange();
                    _this.redraw();
                },
                itemTemplate: (_this.attrs.ww && _this.attrs.ww.itemTemplate) ?
                    _this.attrs.ww.itemTemplate : undefined,
                noItemsTemplate: (_this.attrs.ww && _this.attrs.ww.noItemsTemplate) ?
                    _this.attrs.ww.noItemsTemplate : undefined,
                stringifier: (_this.attrs.ww && _this.attrs.ww.stringifier) ?
                    _this.attrs.ww.stringifier : undefined
            }
        };
        return _this;
    }
    /**
     * @private
     */
    MultiSelect.prototype.fireChange = function () {
        if (this.attrs.ww && this.attrs.ww.onChange)
            this.attrs.ww.onChange(new ItemsChangedEvent(__2.getName(this.attrs), this.values.tags.value.slice()));
    };
    /**
     * @private
     */
    MultiSelect.prototype.grow = function (n) {
        var mInput = util_1.getById(this.view, this.values.input.wml.id);
        if (mInput.isNothing())
            return;
        var i = mInput.get();
        var mDom = util_1.getById(i.view, i.values.wml.id);
        if (mDom.isNothing())
            return;
        var dom = mDom.get();
        dom.style.width = n * this.values.input.fontIncrement + "px";
    };
    /**
     * @private
     */
    MultiSelect.prototype.redraw = function () {
        this.view.invalidate();
        this.focus();
        return this;
    };
    MultiSelect.prototype.setMessage = function (msg) {
        form_1.setMessage(this.view, this.values.messages.wml.id, msg);
        return this;
    };
    MultiSelect.prototype.removeMessage = function () {
        form_1.removeMessage(this.view, this.values.messages.wml.id);
        return this;
    };
    MultiSelect.prototype.update = function (results) {
        search_1.updateMenu(this.view, this.values.menu.wml.id, results);
        return this;
    };
    MultiSelect.prototype.open = function () {
        search_1.openMenu(this.view, this.values.menu.wml.id);
        return this;
    };
    MultiSelect.prototype.close = function () {
        search_1.closeMenu(this.view, this.values.menu.wml.id);
        return this;
    };
    MultiSelect.prototype.focus = function () {
        getInput(this).map(function (i) { return i.focus(); });
        getRoot(this).map(function (e) { return e.classList.add(active_1.ACTIVE); });
        return this;
    };
    /**
     * push a value onto the end of the internal stack.
     */
    MultiSelect.prototype.push = function (value) {
        this.values.tags.value.push(value);
        this.fireChange();
        return this;
    };
    return MultiSelect;
}(form_1.AbstractFormControl));
exports.MultiSelect = MultiSelect;
var getInput = function (m) {
    return util_1.getById(m.view, m.values.input.wml.id);
};
var getRoot = function (m) {
    return util_1.getById(m.view, m.values.root.wml.id);
};
//# sourceMappingURL=index.js.map