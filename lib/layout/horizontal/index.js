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
var views = require("./wml/horizontal");
var orientation_1 = require("../../content/orientation");
var util_1 = require("../../util");
var __1 = require("../../");
///classNames:begin
exports.HORIZONTAL_LAYOUT = 'ww-horizontal-layout';
///classNames:end
/**
 * HorizontalLayoutOrientation
 */
var HorizontalLayoutOrientation;
(function (HorizontalLayoutOrientation) {
    HorizontalLayoutOrientation["Left"] = "left";
    HorizontalLayoutOrientation["Right"] = "right";
})(HorizontalLayoutOrientation = exports.HorizontalLayoutOrientation || (exports.HorizontalLayoutOrientation = {}));
/**
 * HorizontalLayout uses the css flexbox to provide a container
 * where all items are laid out in a single row.
 */
var HorizontalLayout = /** @class */ (function (_super) {
    __extends(HorizontalLayout, _super);
    function HorizontalLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: (_this.attrs.ww && _this.attrs.ww.id) ? _this.attrs.ww.id : '',
                className: util_1.concat(exports.HORIZONTAL_LAYOUT, __1.getClassName(_this.attrs), getOrientation(_this.attrs))
            }
        };
        return _this;
    }
    return HorizontalLayout;
}(wml.Component));
exports.HorizontalLayout = HorizontalLayout;
var getOrientation = function (attrs) {
    return (attrs.ww && attrs.ww.orientation) ?
        attrs.ww.orientation === HorizontalLayoutOrientation.Right ?
            orientation_1.RIGHT : orientation_1.LEFT : '';
};
//# sourceMappingURL=index.js.map