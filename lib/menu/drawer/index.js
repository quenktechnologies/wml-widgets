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
var hidden_1 = require("../../content/state/hidden");
var layout_1 = require("../../layout");
var drawer_1 = require("./wml/drawer");
///classNames:begin
exports.DRAWER = 'ww-drawer';
exports.DRAWER_CONTENT = 'ww-drawer__content';
/**
 * Drawer provides a widget for displaying navigation and other sidebar content.
 *
 * It's api allows for toggling between hidden and shown states as well as
 * querying the current state.
 *
 * This widget's style intentionally gives it a high z-index so that it appears
 * in-front  of other content. Adjust the respective style variables to change.
 */
var Drawer = /** @class */ (function (_super) {
    __extends(Drawer, _super);
    function Drawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new drawer_1.Main(_this);
        _this.values = {
            root: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: exports.DRAWER,
                wml: {
                    id: 'root'
                }
            },
            content: {
                wml: {
                    id: 'content'
                },
                className: exports.DRAWER_CONTENT,
                value: (_this.attrs.ww && _this.attrs.ww.content) ?
                    _this.attrs.ww.content : _this.children
            }
        };
        return _this;
    }
    Drawer.prototype.isHidden = function () {
        return hidden_1.isHidden(this.view, this.values.root.wml.id);
    };
    Drawer.prototype.hide = function () {
        hidden_1.hide(this.view, this.values.root.wml.id);
        return this;
    };
    Drawer.prototype.show = function () {
        hidden_1.show(this.view, this.values.root.wml.id);
        return this;
    };
    Drawer.prototype.toggle = function () {
        hidden_1.toggle(this.view, this.values.root.wml.id);
        return this;
    };
    return Drawer;
}(layout_1.AbstractLayout));
exports.Drawer = Drawer;
//# sourceMappingURL=index.js.map