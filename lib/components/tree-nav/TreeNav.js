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
var wml_runtime_1 = require("@quenk/wml-runtime");
var tree_nav_1 = require("./wml/tree-nav");
var Styles = require("wml-widgets-common/Styles");
/**
 * TreeNavItem is used to indicate an item in the tree.
 */
var TreeNavItem = (function (_super) {
    __extends(TreeNavItem, _super);
    function TreeNavItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new tree_nav_1.TreeNavItemView(_this);
        return _this;
    }
    /**
     * activate this TreeItem
     */
    TreeNavItem.prototype.activate = function () {
        var a = this.view.ids.link;
        if (a instanceof HTMLElement)
            if (a.parentNode instanceof HTMLElement) {
                var children = a.parentNode.children;
                a.classList.remove(Styles.ACTIVE);
                a.classList.add(Styles.ACTIVE);
                for (var i = 0; i < children.length; i++)
                    if (children[i].nodeName === 'A')
                        if (children[i] !== a)
                            children[i].classList.remove(Styles.ACTIVE);
            }
    };
    /**
     * deactivate this DrawerLink
     */
    TreeNavItem.prototype.deactivate = function () {
        this.view.findById('a').classList.remove(Styles.ACTIVE);
    };
    return TreeNavItem;
}(wml_runtime_1.Component));
exports.TreeNavItem = TreeNavItem;
/**
 * TreeNav provides an api for displaying a tree of links.
 */
var TreeNav = (function (_super) {
    __extends(TreeNav, _super);
    function TreeNav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new tree_nav_1.TreeNavView(_this);
        return _this;
    }
    TreeNav.prototype.handleEvent = function (e) {
        this.children.forEach(function (c) {
            if (c instanceof HTMLElement)
                if (c !== e.target)
                    c.classList.remove(Styles.ACTIVE);
        });
    };
    TreeNav.prototype.rendered = function () {
        var _this = this;
        this.children.forEach(function (c) { return c.addEventListener('click', _this); });
    };
    return TreeNav;
}(wml_runtime_1.Component));
exports.TreeNav = TreeNav;
//# sourceMappingURL=TreeNav.js.map