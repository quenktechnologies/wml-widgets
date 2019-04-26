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
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.IMAGE, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.block) ?
                orientation_1.BLOCK : ''),
            src: (_this.attrs.ww && _this.attrs.ww.src) ? _this.attrs.ww.src : '',
            alt: (_this.attrs.ww && _this.attrs.ww.alt) ? _this.attrs.ww.alt : '',
        };
        return _this;
    }
    return Image;
}(wml_1.Component));
exports.Image = Image;
//# sourceMappingURL=index.js.map