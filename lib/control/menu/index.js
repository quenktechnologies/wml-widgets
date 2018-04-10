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
var dividerViews = require("./wml/divider");
var headerViews = require("./wml/header");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var menu_1 = require("./wml/menu");
var item_1 = require("../../content/nav/item");
exports.Item = item_1.Item;
///classNames:begin
exports.MENU = 'ww-menu';
exports.MENU_DIVIDER = 'ww-menu__divider';
exports.MENU_HEADER = 'ww-menu__header';
///classNames:end
exports.NAV_MODE = 'nav';
exports.CONTENT_MODE = 'content';
var get = function (m) { return function () { return m.view.findById(m.values.root.id); }; };
/**
 * Header
 */
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new headerViews.Main(_this);
        _this.values = {
            root: {
                class: util_1.concat(exports.MENU_HEADER, _this.attrs.ww ? _this.attrs.ww.class : '')
            },
            text: (_this.attrs.ww && _this.attrs.ww.text) ?
                _this.attrs.ww.text : null
        };
        return _this;
    }
    return Header;
}(wml_1.Component));
exports.Header = Header;
/**
 * Divider
 */
var Divider = /** @class */ (function (_super) {
    __extends(Divider, _super);
    function Divider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new dividerViews.Main(_this);
        _this.values = {
            root: {
                class: exports.MENU_DIVIDER
            }
        };
        return _this;
    }
    return Divider;
}(wml_1.Component));
exports.Divider = Divider;
/**
 * Menu provides a DOM container for rendering
 * a dropdown style menu.
 */
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new menu_1.Main(_this);
        _this.isHidden = hidden.isHidden(get(_this));
        _this.hide = hidden.hide(_this)(get(_this));
        _this.show = hidden.show(_this)(get(_this));
        _this.toggle = hidden.toggle(_this)(get(_this));
        _this.values = {
            /**
             * root level values.
             */
            root: {
                id: 'root',
                class: util_1.concat(exports.MENU, (_this.attrs.ww && _this.attrs.ww.class) ?
                    _this.attrs.ww.class : '', (_this.attrs.ww && _this.attrs.ww.hidden) ?
                    hidden.HIDDEN : '')
            },
            menu: {
                id: 'menu'
            },
            content: function () { return _this.children; }
        };
        return _this;
    }
    /**
     * setContent of this Menu.
     */
    Menu.prototype.setContent = function (view) {
        this.values.content = function () { return [view.render()]; };
        this.view.invalidate();
        this.show();
        return this;
    };
    return Menu;
}(wml_1.Component));
exports.Menu = Menu;
//# sourceMappingURL=index.js.map