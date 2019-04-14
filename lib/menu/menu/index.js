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
var hidden = require("../../content/state/hidden");
var headerViews = require("./wml/header");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
var menu_1 = require("./wml/menu");
///classNames:begin
exports.MENU = 'ww-menu';
exports.MENU_HEADER_ITEM = 'ww-menu__header-item';
///classNames:end
exports.NAV_MODE = 'nav';
exports.CONTENT_MODE = 'content';
/**
 * HeaderItem
 */
var HeaderItem = /** @class */ (function (_super) {
    __extends(HeaderItem, _super);
    function HeaderItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new headerViews.Main(_this);
        _this.values = {
            root: {
                className: util_1.concat(exports.MENU_HEADER_ITEM, __1.getClassName(_this.attrs)),
                content: (_this.attrs.ww && _this.attrs.ww.text) ?
                    [__1.text(_this.attrs.ww.text)] : _this.children
            }
        };
        return _this;
    }
    return HeaderItem;
}(wml_1.Component));
exports.HeaderItem = HeaderItem;
/**
 * Menu provides a DOM container for rendering
 * a dropdown style menu.
 */
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new menu_1.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.MENU, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.hidden) ? hidden.HIDDEN : '')
            },
            menu: {
                id: 'menu'
            },
            content: function () { return _this.children; }
        };
        return _this;
    }
    Menu.prototype.isHidden = function () {
        return hidden.isHidden(this.view, this.values.root.wml.id);
    };
    Menu.prototype.hide = function () {
        hidden.hide(this.view, this.values.root.wml.id);
        return this;
    };
    Menu.prototype.show = function () {
        hidden.show(this.view, this.values.root.wml.id);
        return this;
    };
    Menu.prototype.toggle = function () {
        hidden.toggle(this.view, this.values.root.wml.id);
        return this;
    };
    Menu.prototype.setContent = function (content) {
        this.values.content = function () { return content; };
        this.view.invalidate();
        this.show();
        return this;
    };
    return Menu;
}(wml_1.Component));
exports.Menu = Menu;
//# sourceMappingURL=index.js.map