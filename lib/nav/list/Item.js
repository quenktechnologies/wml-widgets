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
var names = require("@package/self/common/names");
var views = require("./wml/item");
var wml = require("@quenk/wml");
var util_1 = require("@package/self/common/util");
/**
 * Item wraps content in a navigation list.
 *
 * Items should not have any siblings that are not other Items.
 */
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            id: {
                root: 'root'
            },
            class: {
                root: util_1.concat(names.NAV_LIST_ITEM, (_this.attrs.ww && _this.attrs.ww.active) ? names.ACTIVE : null)
            },
            text: (_this.attrs.ww && _this.attrs.ww.text) ?
                _this.attrs.ww.text : null
        };
        return _this;
    }
    /**
     * activate this nav list Item.
     */
    Item.prototype.activate = function () {
        this.view.findById(this.values.id.root)
            .map(function (w) {
            w.classList.remove(names.ACTIVE);
            w.classList.add(names.ACTIVE);
        });
    };
    /**
     * inactivate this nav list item.
     */
    Item.prototype.inactivate = function () {
        this.view.findById(this.values.id.root)
            .map(function (w) { return w.classList.remove(names.ACTIVE); });
    };
    return Item;
}(wml.Component));
exports.Item = Item;
//# sourceMappingURL=Item.js.map