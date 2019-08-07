"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wml_1 = require("@quenk/wml");
var toolbar_1 = require("../toolbar");
var orientation_1 = require("../../content/orientation");
var style_1 = require("../../content/style");
exports.Style = style_1.Style;
var size_1 = require("../../content/size");
var util_1 = require("../../util");
var __1 = require("../../");
var display_field_1 = require("./wml/display-field");
///classNames:begin
exports.DISPLAY_FIELD = 'ww-display-field';
exports.DISPLAY_FIELD_CONTENT = 'ww-display-field__content';
;
/**
 * DisplayField is used to display a value in a text field like box.
 */
var DisplayField = /** @class */ (function (_super) {
    __extends(DisplayField, _super);
    function DisplayField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new display_field_1.Main(_this);
        _this.values = {
            wml: {
                id: 'display'
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.DISPLAY_FIELD, __1.getClassName(_this.attrs), toolbar_1.TOOLBAR_COMPAT, (_this.attrs.ww && _this.attrs.ww.style) ?
                style_1.getStyleClassName(_this.attrs.ww.style) :
                style_1.DEFAULT, (_this.attrs.ww && _this.attrs.ww.size) ?
                size_1.getSizeClassName(_this.attrs.ww.size) : '', (_this.attrs.ww && _this.attrs.ww.block) ?
                orientation_1.BLOCK : ''),
            onclick: function (e) {
                e.stopPropagation(); //prevent a bug when used with ResultsMenu
                if (_this.attrs.ww && _this.attrs.ww.onClick)
                    _this.attrs.ww.onClick();
            },
            content: {
                className: exports.DISPLAY_FIELD_CONTENT
            }
        };
        return _this;
    }
    return DisplayField;
}(wml_1.Component));
exports.DisplayField = DisplayField;
//# sourceMappingURL=index.js.map