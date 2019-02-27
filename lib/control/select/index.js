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
var views = require("./wml/select");
var util_1 = require("../../util");
var feedback_1 = require("../feedback");
var search_1 = require("../search");
exports.TermChangedEvent = search_1.TermChangedEvent;
var __1 = require("../../");
var __2 = require("../");
exports.ESCAPE = 27;
exports.INPUT_ID = 'input';
///classNames:begin
exports.SELECT = 'ww-select';
/**
 * ItemChangedEvent
 */
var ItemChangedEvent = /** @class */ (function (_super) {
    __extends(ItemChangedEvent, _super);
    function ItemChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ItemChangedEvent;
}(__2.Event));
exports.ItemChangedEvent = ItemChangedEvent;
/* *
 * Autocomplate provides an input with a dropdown menu that allows
 * the user to search and select form a list of options.
 */
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.SELECT, __1.getClassName(_this.attrs)),
            },
            control: {
                wml: {
                    id: 'root'
                }
            },
            messages: {
                wml: {
                    id: 'message'
                }
            },
            input: {
                wml: {
                    id: 'input'
                }
            },
            menu: {
                wml: {
                    id: 'menu'
                },
                hide: true,
                options: (_this.attrs.ww && _this.attrs.ww.options) || []
            },
            label: {
                id: __2.getName(_this.attrs),
                text: (_this.attrs.ww && _this.attrs.ww.label) ?
                    _this.attrs.ww.label : ''
            },
            search: {
                wml: {
                    id: 'search'
                },
                name: __2.getName(_this.attrs),
                className: (_this.attrs.ww && _this.attrs.ww.inputClassName) ?
                    _this.attrs.ww.inputClassName : '',
                placeholder: (_this.attrs.ww && _this.attrs.ww.placeholder) ?
                    _this.attrs.ww.placeholder : '',
                readOnly: (_this.attrs.ww && _this.attrs.ww.readOnly),
                onFocus: function () {
                    if (_this.values.menu.options.length > 0)
                        _this.update(_this.values.menu.options);
                },
                onSearch: (_this.attrs.ww && _this.attrs.ww.onSearch) ?
                    _this.attrs.ww.onSearch : function () { },
                onEscape: function () { return _this.close(); },
            },
            item: {
                itemContentTemplate: function () {
                    return (_this.attrs.ww && _this.attrs.ww.itemContentTemplate) ?
                        _this.attrs.ww.itemContentTemplate : views.itemContentTemplate;
                },
                noItemsTemplate: function () {
                    return (_this.attrs.ww && _this.attrs.ww.noItemsTemplate) ?
                        _this.attrs.ww.noItemsTemplate : views.noItemsTemplate;
                },
                stringify: (_this.attrs.ww && _this.attrs.ww.stringifier) ?
                    _this.attrs.ww.stringifier : function (v) { return ('' + v); },
                click: function (index) {
                    var selected = _this.values.menu.options[Number(index)];
                    _this.close();
                    if (_this.attrs.ww && _this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(new ItemChangedEvent('' + _this.attrs.ww.name, selected));
                    util_1.getById(_this.view, _this.values.search.wml.id)
                        .map(function (s) { return s.set(_this.values.item.stringify(selected)); });
                }
            }
        };
        return _this;
    }
    Select.prototype.handleEvent = function (e) {
        var _this = this;
        util_1.getById(this.view, this.values.root.wml.id)
            .map(function (root) {
            if (!document.body.contains(root))
                document.removeEventListener('click', _this);
            if ((!root.contains(e.target)))
                _this.close();
        });
    };
    Select.prototype.open = function () {
        util_1.getById(this.view, this.values.menu.wml.id)
            .map(function (m) { return m.show(); });
        return this;
    };
    Select.prototype.close = function () {
        util_1.getById(this.view, this.values.menu.wml.id)
            .map(function (m) { return m.hide(); });
        return this;
    };
    /**
     * update the Select with new item options to
     * present to the user.
     */
    Select.prototype.update = function (results) {
        var _this = this;
        this.values.menu.options = results;
        window.removeEventListener('click', this);
        window.addEventListener('click', this);
        util_1.getById(this.view, this.values.menu.wml.id)
            .map(function (m) { return m.setContent(views.results(_this)(_this.view)); });
        return this;
    };
    return Select;
}(feedback_1.AbstractFeedbackControl));
exports.Select = Select;
//# sourceMappingURL=index.js.map