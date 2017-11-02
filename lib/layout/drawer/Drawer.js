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
var drawer_1 = require("./wml/drawer");
;
/**
 * Drawer provides a 2 column application layout with the first typically used as navaigation
 * and the second main application content.
 *
 * ```wml
 *
 *  <Drawer
 *   wml:id="layout"
 *   content={{this.getContent()}} />
 *
 * ```
 */
var Drawer = /** @class */ (function (_super) {
    __extends(Drawer, _super);
    function Drawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new drawer_1.Main(_this);
        /**
         * values is a hash of values used in the template.
         */
        _this.values = {
            id: {
                root: 'content',
                drawer: 'drawer'
            },
            class: {
                root: names.DRAWER,
            },
            attrs: {
                DRAWER: 'ww:drawer',
                CONTENT: 'ww:content'
            }
        };
        return _this;
    }
    Drawer.prototype._getAside = function (f) {
        return this.view.findById(this.values.id.drawer).cata(function () { return null; }, f);
    };
    Drawer.prototype._combine = function (classes) {
        return classes.join(' ');
    };
    /**
     * drawerVisible queries whether the Aside is visible or not.
     */
    Drawer.prototype.drawerVisible = function () {
        return this._getAside(function (a) { return a.visible(); });
    };
    /**
     * hideDrawer hides the drawer.
     */
    Drawer.prototype.hideDrawer = function () {
        return this._getAside(function (a) { return a.hide(); });
    };
    /**
     * showDrawer shows the drawer
     */
    Drawer.prototype.showDrawer = function () {
        return this._getAside(function (a) { return a.show(); });
    };
    /**
     * toggle the visibility of the Aside.
     */
    Drawer.prototype.toggleDrawer = function () {
        return this._getAside(function (a) { return a.toggle(); });
    };
    return Drawer;
}(Group_1.Group));
exports.Drawer = Drawer;
//# sourceMappingURL=Drawer.js.map