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
exports.Item = exports.ItemClickedEvent = exports.DIVIDER = exports.ITEM = void 0;
var wml = require("@quenk/wml");
var views = require("./wml/item");
var active_1 = require("../../content/state/active");
var active_2 = require("../../content/state/active");
var util_1 = require("../../util");
///classNames:begin
exports.ITEM = 'ww-menu-item';
exports.DIVIDER = '-divider';
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
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: (_this.attrs.ww && _this.attrs.ww.id) ? _this.attrs.ww.id : '',
                className: util_1.concat(exports.ITEM, (_this.attrs.ww && _this.attrs.ww.active) ? active_2.ACTIVE : '', (_this.attrs.ww && _this.attrs.ww.divider) ? exports.DIVIDER : ''),
                content: {
                    render: function () {
                        if (_this.attrs.ww && _this.attrs.ww.divider)
                            return [];
                        else if (_this.attrs.ww && _this.attrs.ww.text)
                            return [document.createTextNode(_this.attrs.ww.text)];
                        else
                            return _this.children;
                    }
                }
            }
        };
        return _this;
    }
    Item.prototype.activate = function () {
        active_1.activate(this.view, this.values.root.wml.id);
        return this;
    };
    Item.prototype.deactivate = function () {
        active_1.deactivate(this.view, this.values.root.wml.id);
        return this;
    };
    return Item;
}(wml.Component));
exports.Item = Item;
//# sourceMappingURL=index.js.map