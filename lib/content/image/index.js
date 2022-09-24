"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = exports.IMAGE = void 0;
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var orientation_1 = require("../../content/orientation");
var __1 = require("../../");
var image_1 = require("./wml/image");
///classNames:begin
exports.IMAGE = 'ww-image';
/**
 * Image
 */
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new image_1.Main(_this);
        _this.values = {
            wml: {
                id: 'image'
            },
            id: (0, __1.getId)(_this.attrs),
            className: (0, util_1.concat)(exports.IMAGE, (0, __1.getClassName)(_this.attrs), (_this.attrs && _this.attrs.block) ?
                orientation_1.BLOCK : ''),
            src: (_this.attrs && _this.attrs.src) ? _this.attrs.src : '',
            alt: (_this.attrs && _this.attrs.alt) ? _this.attrs.alt : '',
        };
        return _this;
    }
    return Image;
}(wml_1.Component));
exports.Image = Image;
//# sourceMappingURL=index.js.map