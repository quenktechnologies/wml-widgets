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
var Group_1 = require("../../content/Group");
var drawer_1 = require("./wml/drawer");
var getDom = function (d) { return function () {
    return d
        .view
        .findById(d.values.root.id)
        .map(function (e) { return e; });
}; };
///classNames:begin
exports.DRAWER = 'ww-drawer';
exports.DRAWER_CONTENT = 'ww-drawer__content';
/**
 * Drawer provides a widget for displaying navigation and other sidebar content.
 *
 * It's api allows for toggling between hidden and shown states as well as querying the
 * current state.
 *
 * This widget's style intentionally gives it a high z-index so that it appears in-front
 * of other content. Adjust the respective style variables to change.
 */
var Drawer = /** @class */ (function (_super) {
    __extends(Drawer, _super);
    function Drawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new drawer_1.Main(_this);
        _this.isVisible = hidden_1.isVisible(getDom(_this));
        _this.hide = hidden_1.hide(_this)(getDom(_this));
        _this.show = hidden_1.show(_this)(getDom(_this));
        _this.toggle = hidden_1.toggle(_this)(getDom(_this));
        /**
         * values is a hash of values used in the template
         */
        _this.values = {
            root: {
                id: 'drawer',
                class: exports.DRAWER,
            },
            content: {
                class: exports.DRAWER_CONTENT,
                render: function () { return (_this.attrs.ww && _this.attrs.ww.content) ?
                    _this.attrs.ww.content.render() :
                    _this.children; }
            }
        };
        return _this;
    }
    return Drawer;
}(Group_1.Group));
exports.Drawer = Drawer;
//# sourceMappingURL=index.js.map