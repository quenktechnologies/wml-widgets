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
var names = require("@package/wml-widgets/common/names");
var views = require("./wml/menu-item");
var wml = require("@quenk/wml");
var util_1 = require("@package/wml-widgets/common/util");
var MenuItemClickedEvent_1 = require("./MenuItemClickedEvent");
/**
 * MenuItem
 */
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            id: {
                root: 'root'
            },
            class: {
                root: util_1.concat(names.MENU_ITEM, (_this.attrs.ww && _this.attrs.ww.disabled) ?
                    names.DISABLED : null)
            },
            text: (_this.attrs.ww && _this.attrs.ww.text) ?
                _this.attrs.ww.text : null,
            clicked: function () { return (_this.attrs.ww && _this.attrs.ww.onClick) ?
                _this.attrs.ww.onClick(new MenuItemClickedEvent_1.MenuItemClickedEvent(_this.attrs.ww.name)) : function () { }; }
        };
        return _this;
    }
    return MenuItem;
}(wml.Component));
exports.MenuItem = MenuItem;
//# sourceMappingURL=MenuItem.js.map