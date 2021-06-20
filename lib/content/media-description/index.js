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
exports.Description = exports.Media = exports.MediaDescription = exports.MEDIA_DESCRIPTION_DESCRIPTION = exports.MEDIA_DESCRIPTION_MEDIA = exports.MEDIA_DESCRIPTION = void 0;
var views = require("./wml/media-description");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
///classNames:begin
exports.MEDIA_DESCRIPTION = 'ww-media-description';
exports.MEDIA_DESCRIPTION_MEDIA = 'ww-media-description__media';
exports.MEDIA_DESCRIPTION_DESCRIPTION = 'ww-media-description__description';
/**
 * MediaDescription
 */
var MediaDescription = /** @class */ (function (_super) {
    __extends(MediaDescription, _super);
    function MediaDescription() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.MediaDescription(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.MEDIA_DESCRIPTION, __1.getClassName(_this.attrs))
        };
        return _this;
    }
    return MediaDescription;
}(wml_1.Component));
exports.MediaDescription = MediaDescription;
/**
 * Media
 */
var Media = /** @class */ (function (_super) {
    __extends(Media, _super);
    function Media() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Media(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.MEDIA_DESCRIPTION_MEDIA, __1.getClassName(_this.attrs))
        };
        return _this;
    }
    return Media;
}(wml_1.Component));
exports.Media = Media;
/**
 * Description
 */
var Description = /** @class */ (function (_super) {
    __extends(Description, _super);
    function Description() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Description(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.MEDIA_DESCRIPTION_DESCRIPTION, __1.getClassName(_this.attrs))
        };
        return _this;
    }
    return Description;
}(wml_1.Component));
exports.Description = Description;
//# sourceMappingURL=index.js.map