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
var Group_1 = require("@package/self/content/Group");
var names = require("@package/self/common/names");
var aside_1 = require("./wml/aside");
/**
 * Aside provides a widget for displaying navigation and other sidebar content.
 *
 * It's api allows for toggling between hidden and shown states as well as querying the
 * current state.
 *
 * This widget's style intentionally gives it a high z-index so that it appears in-front
 * of other content. Adjust the respective style variables to change.
 */
var Aside = /** @class */ (function (_super) {
    __extends(Aside, _super);
    function Aside() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * values is a hash of values used in the template
         */
        _this.values = {
            id: {
                root: 'aside',
            },
            class: {
                root: names.ASIDE,
                content: names.ASIDE_CONTENT
            },
            attrs: {
                content: 'ww:content'
            }
        };
        _this.view = new aside_1.Main(_this);
        return _this;
    }
    Aside.prototype._getDrawerDOM = function (f) {
        return this.view.findById(this.values.id.root).cata(function () { return null; }, f);
    };
    /**
     * visible queries whether the Drawer is visible or not.
     */
    Aside.prototype.visible = function () {
        return !this._getDrawerDOM(function (e) { return e.classList.contains(names.HIDDEN); });
    };
    /**
     * hide the drawer.
     */
    Aside.prototype.hide = function () {
        if (this.visible())
            this._getDrawerDOM(function (e) { return e.classList.add(names.HIDDEN); });
    };
    /**
     * showDrawer shows the drawer
     */
    Aside.prototype.show = function () {
        if (!this.visible())
            this._getDrawerDOM(function (e) { return e.classList.remove(names.HIDDEN); });
    };
    /**
     * toggle the visibility of this Drawer
     */
    Aside.prototype.toggle = function () {
        this._getDrawerDOM(function (e) { return e.classList.toggle(names.HIDDEN); });
    };
    return Aside;
}(Group_1.Group));
exports.Aside = Aside;
//# sourceMappingURL=Aside.js.map