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
var style_1 = require("../../content/style");
exports.Style = style_1.Style;
var util_1 = require("../../util");
var __1 = require("../../");
var tag_1 = require("./wml/tag");
///classNames:begin
exports.TAG = 'ww-tag';
/**
 * Tag
 */
var Tag = /** @class */ (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new tag_1.Main(_this);
        _this.values = {
            wml: {
                id: 'tag'
            },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.TAG, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.style) ?
                style_1.getStyleClassName(_this.attrs.ww.style) :
                style_1.DEFAULT),
            onclick: function (_) {
                if (_this.attrs.ww && _this.attrs.ww.onClick)
                    _this.attrs.ww.onClick();
            },
            content: (_this.attrs.ww && _this.attrs.ww.text) ?
                [__1.text(_this.attrs.ww.text)] : _this.children
        };
        return _this;
    }
    return Tag;
}(wml_1.Component));
exports.Tag = Tag;
//# sourceMappingURL=index.js.map