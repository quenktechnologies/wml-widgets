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
var views = require("./wml/item");
var names = require("./classNames");
var active_1 = require("../../state/active");
var classNames_1 = require("../../state/active/classNames");
var util_1 = require("../../../util");
var get = function (i) {
    return function () { return i.view.findById(i.values.root.id).map(function (e) { return e; }); };
};
/**
 * ItemClickedEvent is fired when the user clicks on an item in
 * a nav list.
 */
var ItemClickedEvent = /** @class */ (function () {
    function ItemClickedEvent(name) {
        this.name = name;
    }
    return ItemClickedEvent;
}());
exports.ItemClickedEvent = ItemClickedEvent;
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
        _this.activate = active_1.activate(_this)(get(_this));
        _this.deactivate = active_1.deactivate(_this)(get(_this));
        _this.values = {
            root: {
                id: 'root',
                class: util_1.concat(names.ITEM, (_this.attrs.ww && _this.attrs.ww.active) ? classNames_1.ACTIVE : null)
            },
            content: {
                render: function () { return (_this.attrs.ww && _this.attrs.ww.text) ?
                    _this.attrs.ww.text : _this.children; }
            }
        };
        return _this;
    }
    return Item;
}(wml.Component));
exports.Item = Item;
//# sourceMappingURL=index.js.map