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
var item = require("./wml/list-layout-item");
var layout = require("./wml/list-layout");
var util_1 = require("../../util");
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
        _this.view = new item.Main(_this);
        _this.values = {
            root: {
                class: exports.LIST_LAYOUT_ITEM
            }
        };
        return _this;
    }
    return ListLayoutItem;
}(wml.Component));
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
        _this.view = new layout.Main(_this);
        _this.values = {
            root: {
                class: util_1.concat(exports.LIST_LAYOUT, _this.attrs.ww && _this.attrs.ww.class)
            }
        };
        return _this;
    }
    return ListLayout;
}(wml.Component));
exports.ListLayout = ListLayout;
//# sourceMappingURL=index.js.map