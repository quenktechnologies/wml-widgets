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
var views = require("./wml/drop-list");
var util_1 = require("../../util");
var size_1 = require("../../content/size");
var orientation_1 = require("../../content/orientation");
var results_menu_1 = require("../results-menu");
exports.ItemSelectedEvent = results_menu_1.ItemSelectedEvent;
var search_1 = require("../search");
var __1 = require("../../");
var __2 = require("../");
///classNames:begin
exports.DROP_LIST = 'ww-drop-list';
/**
 * DropList provides a control for making a selection from a list of choices.
 */
var DropList = /** @class */ (function (_super) {
    __extends(DropList, _super);
    function DropList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.DROP_LIST, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.size) ?
                size_1.getSizeClassName(_this.attrs.ww.size) : '', (_this.attrs.ww && _this.attrs.ww.block) ?
                orientation_1.BLOCK : ''),
            name: __2.getName(_this.attrs),
            value: (_this.attrs.ww && _this.attrs.ww.value),
            control: {
                wml: {
                    id: 'drop-list'
                }
            },
            messages: {
                wml: {
                    id: 'messages'
                }
            },
            display: {
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled),
                placeholder: function () {
                    if (_this.attrs.ww) {
                        if (_this.attrs.ww.options && _this.values.value)
                            return getCurrent(_this.attrs.ww.options, _this.values.value);
                        return _this.attrs.ww.placeholder || 'Select one';
                    }
                },
                onClick: function () {
                    _this.toggle();
                }
            },
            menu: {
                wml: {
                    id: 'menu'
                },
                name: (_this.attrs.ww && _this.attrs.ww.name) ?
                    _this.attrs.ww.name : '',
                block: (_this.attrs.ww && _this.attrs.ww.block) ?
                    _this.attrs.ww.block : false,
                hidden: true,
                results: (_this.attrs.ww && _this.attrs.ww.options) ?
                    _this.attrs.ww.options : [],
                onSelect: function (e) {
                    if (_this.attrs.ww && _this.attrs.ww.onSelect)
                        _this.attrs.ww.onSelect(new results_menu_1.ItemSelectedEvent(e.name, e.value.value));
                    _this.values.value = e.value.value;
                    _this.view.invalidate();
                },
                itemTemplate: (_this.attrs.ww && _this.attrs.ww.itemTemplate) ?
                    _this.attrs.ww.itemTemplate : undefined,
                noItemsTemplate: (_this.attrs.ww && _this.attrs.ww.noItemsTemplate) ?
                    _this.attrs.ww.noItemsTemplate : undefined,
                stringifier: (_this.attrs.ww && _this.attrs.ww.stringifier) ?
                    _this.attrs.ww.stringifier : function (v) { return v.label; }
            }
        };
        return _this;
    }
    /**
     * update changes the options available in the list.
     *
     * The view will be invalidated.
     */
    DropList.prototype.update = function (options) {
        this.values.menu.results = options;
        this.view.invalidate();
        return this;
    };
    /**
     * open the results menu.
     */
    DropList.prototype.open = function () {
        search_1.openMenu(this.view, this.values.menu.wml.id);
        return this;
    };
    /**
     * close the results menu.
     */
    DropList.prototype.close = function () {
        search_1.closeMenu(this.view, this.values.menu.wml.id);
        return this;
    };
    /**
     * toggle the results menu.
     */
    DropList.prototype.toggle = function () {
        search_1.toggleMenu(this.view, this.values.menu.wml.id);
        return this;
    };
    return DropList;
}(__2.AbstractControl));
exports.DropList = DropList;
var getCurrent = function (opts, value, text) {
    if (text === void 0) { text = 'Select one'; }
    return opts.reduce(function (p, c) { return c.value === value ? c.label : p; }, text);
};
//# sourceMappingURL=index.js.map