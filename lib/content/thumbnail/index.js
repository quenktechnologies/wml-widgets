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
var views = require("./wml/thumbnail");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
///classNames:begin
exports.THUMBNAIL = 'ww-thumbnail';
exports.THUMBNAIL_CAPTION = 'ww-thumbnail__caption';
/**
 * Thumbnail
 */
var Thumbnail = /** @class */ (function (_super) {
    __extends(Thumbnail, _super);
    function Thumbnail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = (_this.attrs.ww && _this.attrs.ww.href) ?
            new views.Anchor(_this) : new views.Thumbnail(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.THUMBNAIL, __1.getClassName(_this.attrs)),
            href: (_this.attrs.ww && _this.attrs.ww.href) ?
                _this.attrs.ww.href : '',
            onclick: function (e) {
                if (_this.attrs.ww && _this.attrs.ww.onClick) {
                    e.preventDefault();
                    _this.attrs.ww.onClick();
                }
            }
        };
        return _this;
    }
    return Thumbnail;
}(wml_1.Component));
exports.Thumbnail = Thumbnail;
/**
 * Caption
 */
var Caption = /** @class */ (function (_super) {
    __extends(Caption, _super);
    function Caption() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Caption(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.THUMBNAIL_CAPTION, __1.getClassName(_this.attrs))
        };
        return _this;
    }
    return Caption;
}(wml_1.Component));
exports.Caption = Caption;
//# sourceMappingURL=index.js.map