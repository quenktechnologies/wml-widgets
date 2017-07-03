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
var runtime_1 = require("@quenk/wml/lib/runtime");
var Styles = require("common/Styles");
var view_1 = require("./wml/view");
/**
 * DrawerLayout provides a top level layout consisting of a drawer and
 * a main content view.
 */
var DrawerLayout = (function (_super) {
    __extends(DrawerLayout, _super);
    function DrawerLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new view_1.Main(_this);
        return _this;
    }
    DrawerLayout.prototype._getDrawerDOM = function () {
        return this.view.findById('drawer');
    };
    DrawerLayout.prototype._combine = function (classes) {
        return classes.join(' ');
    };
    /**
     * drawerContent provides the content for this layout's Drawer.
     */
    DrawerLayout.prototype.drawerContent = function () {
        return this.children[0];
    };
    /**
     * mainViewContent provides the content for this layout's MainView.
     */
    DrawerLayout.prototype.mainViewContent = function () {
        return this.children[1];
    };
    /**
     * drawerVisible queries whether the Drawer is visible or not.
     * @returns {Boolean}
     */
    DrawerLayout.prototype.drawerVisible = function () {
        return !this._getDrawerDOM().classList.contains(Styles.HIDDEN);
    };
    /**
     * hideDrawer hides the drawer.
     */
    DrawerLayout.prototype.hideDrawer = function () {
        if (this.drawerVisible())
            this._getDrawerDOM().classList.add(Styles.HIDDEN);
    };
    /**
     * showDrawer shows the drawer
     */
    DrawerLayout.prototype.showDrawer = function () {
        if (!this.drawerVisible())
            this._getDrawerDOM().classList.remove(Styles.HIDDEN);
    };
    /**
     * toggle the visibility of this Drawer
     */
    DrawerLayout.prototype.toggle = function () {
        this._getDrawerDOM().classList.toggle(Styles.HIDDEN);
    };
    DrawerLayout.prototype.rendered = function () {
        if (window.matchMedia('(max-width: 480px').matches)
            window.addEventListener('click', this);
    };
    DrawerLayout.prototype.handleEvent = function (e) {
        if (e instanceof MouseEvent) {
            var drawer = this.view.findById('drawer');
            var target = e.target;
            if ((target !== drawer) && (!drawer.contains(target)))
                if (!window.document.contains(drawer))
                    window.removeEventListener('click', this);
                else
                    this.hideDrawer();
        }
    };
    DrawerLayout.prototype.render = function () {
        if (this.children.length !== 2)
            console.warn("DrawerLayout: Expected 2 child widgets got " + this.children.length + "!");
        return this.view.render();
    };
    return DrawerLayout;
}(runtime_1.AbstractWidget));
exports.DrawerLayout = DrawerLayout;
exports.default = DrawerLayout;
//# sourceMappingURL=DrawerLayout.js.map