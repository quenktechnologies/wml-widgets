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
var names = require("../../common/names");
var views = require("./wml/breadcrumbs");
var wml_1 = require("@quenk/wml");
/**
 * Item for breadcrumb lists.
 */
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Item(_this);
        _this.values = {
            class: {
                root: names.BREAD_CRUMBS_ITEM
            }
        };
        return _this;
    }
    return Item;
}(wml_1.Component));
exports.Item = Item;
//# sourceMappingURL=Item.js.map