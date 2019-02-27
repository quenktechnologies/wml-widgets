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
var views = require("./wml/list");
var util_1 = require("../../util");
var active_1 = require("../../content/state/active");
var __1 = require("../");
///classNames:begin
exports.LIST_LAYOUT = 'ww-list-layout';
exports.LIST_LAYOUT_ITEM = 'ww-list-layout__item';
/**
 * ListLayoutItem
 */
var ListLayoutItem = /** @class */ (function (_super) {
    __extends(ListLayoutItem, _super);
    function ListLayoutItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.ListLayoutItem(_this);
        _this.values = {
            content: {
                wml: {
                    id: 'item'
                },
                id: (_this.attrs.ww && _this.attrs.ww.id) ? _this.attrs.ww.id : '',
                className: util_1.concat(exports.LIST_LAYOUT_ITEM, (_this.attrs.ww && _this.attrs.ww.active) ? active_1.ACTIVE : '')
            }
        };
        return _this;
    }
    ListLayoutItem.prototype.activate = function () {
        active_1.activate(this.view, this.values.content.wml.id);
        return this;
    };
    ListLayoutItem.prototype.deactivate = function () {
        active_1.deactivate(this.view, this.values.content.wml.id);
        return this;
    };
    return ListLayoutItem;
}(__1.AbstractLayout));
exports.ListLayoutItem = ListLayoutItem;
/**
 * ListLayout is used to create a vertical list of content.
 *
 * Children must be ListGroupItems.
 */
var ListLayout = /** @class */ (function (_super) {
    __extends(ListLayout, _super);
    function ListLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.ListLayout(_this);
        _this.values = {
            content: {
                wml: {
                    id: 'list'
                },
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: util_1.concat(exports.LIST_LAYOUT, __1.LAYOUT, (_this.attrs.ww && _this.attrs.ww.className) ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return ListLayout;
}(__1.AbstractLayout));
exports.ListLayout = ListLayout;
//# sourceMappingURL=index.js.map