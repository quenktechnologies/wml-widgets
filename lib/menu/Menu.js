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
var names = require("@package/self/common/names");
var util_1 = require("@package/self/common/util");
var menu_1 = require("./wml/menu");
/**
 * Menu
 */
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new menu_1.Main(_this);
        _this.values = {
            id: {
                root: 'root',
                target: 'menu'
            },
            class: {
                root: util_1.concat(names.MENU, (_this.attrs.ww && _this.attrs.ww.class) ?
                    _this.attrs.ww.class : '', (_this.attrs.ww && _this.attrs.ww.hidden) ?
                    names.HIDDEN : '')
            },
            content: _this.children,
            click: {
                hideOnClick: (_this.attrs.ww && (_this.attrs.ww.hideOnClick != null)) ?
                    _this.attrs.ww.hideOnClick : true,
                hideOnExternalClick: (_this.attrs.ww && (_this.attrs.ww.hideOnExternalClick != null)) ?
                    _this.attrs.ww.hideOnExternalClick : true
            }
        };
        return _this;
    }
    /**
     * isHidden
     */
    Menu.prototype.isHidden = function () {
        return this.view.findById(this.values.id.root)
            .cata(function () { return false; }, function (e) { return e.classList.contains(names.HIDDEN); });
    };
    /**
     * hide the menu.
     */
    Menu.prototype.hide = function () {
        this.view.findById(this.values.id.root)
            .map(function (e) {
            return e.classList.add(names.HIDDEN);
        });
        return this;
    };
    /**
     * show this menu.
     */
    Menu.prototype.show = function () {
        this.view.findById(this.values.id.root)
            .map(function (e) {
            return e.classList.remove(names.HIDDEN);
        });
        return this;
    };
    /**
     * toggle this menu's visibility
     */
    Menu.prototype.toggle = function () {
        this.view.findById(this.values.id.root)
            .map(function (e) {
            return e.classList.toggle(names.HIDDEN);
        });
        return this;
    };
    /**
     * setContent of this menu.
     */
    Menu.prototype.setContent = function (view) {
        this.values.content = [view.render()];
        this.view.invalidate();
        return this;
    };
    Menu.prototype.handleEvent = function (e) {
        var _this = this;
        this
            .view
            .findById(this.values.id.root)
            .map(function (root) {
            if (!document.body.contains(root))
                document.removeEventListener('click', _this);
            if ((!root.contains(e.target)) && _this.values.click.hideOnExternalClick)
                _this.hide();
        });
    };
    Menu.prototype.rendered = function () {
        //window.addEventListener('click', this);
    };
    return Menu;
}(wml.Component));
exports.Menu = Menu;
//# sourceMappingURL=Menu.js.map