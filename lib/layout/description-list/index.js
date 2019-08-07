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
var views = require("./wml/description-list");
var wml_1 = require("@quenk/wml");
var orientation_1 = require("../../content/orientation");
var util_1 = require("../../util");
var __1 = require("../../");
///classNames:begin
exports.DESCRIPTION_LIST = 'ww-description-list';
exports.DESCRIPTION_LIST_TITLE = 'ww-description-list__title';
exports.DESCRIPTION_LIST_DATA = 'ww-description-list__data';
/**
 * DescriptionList layout.
 */
var DescriptionList = /** @class */ (function (_super) {
    __extends(DescriptionList, _super);
    function DescriptionList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.DescriptionList(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.DESCRIPTION_LIST, __1.getClassName(_this.attrs), (_this.attrs.ww && _this.attrs.ww.horizontal) ? orientation_1.HORIZONTAL : '')
        };
        return _this;
    }
    return DescriptionList;
}(wml_1.Component));
exports.DescriptionList = DescriptionList;
/**
 * Title
 */
var Title = /** @class */ (function (_super) {
    __extends(Title, _super);
    function Title() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Title(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.DESCRIPTION_LIST_TITLE, __1.getClassName(_this.attrs))
        };
        return _this;
    }
    return Title;
}(wml_1.Component));
exports.Title = Title;
/**
 * Data
 */
var Data = /** @class */ (function (_super) {
    __extends(Data, _super);
    function Data() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Data(_this);
        _this.values = {
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.DESCRIPTION_LIST_DATA, __1.getClassName(_this.attrs))
        };
        return _this;
    }
    return Data;
}(wml_1.Component));
exports.Data = Data;
//# sourceMappingURL=index.js.map