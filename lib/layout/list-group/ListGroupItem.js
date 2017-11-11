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
var views = require("./wml/list-group-item");
var wml = require("@quenk/wml");
var names = require("@package/self/common/names");
/**
 * ListGroupItem
 */
var ListGroupItem = /** @class */ (function (_super) {
    __extends(ListGroupItem, _super);
    function ListGroupItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                class: names.LIST_GROUP_ITEM
            }
        };
        return _this;
    }
    return ListGroupItem;
}(wml.Component));
exports.ListGroupItem = ListGroupItem;
//# sourceMappingURL=ListGroupItem.js.map