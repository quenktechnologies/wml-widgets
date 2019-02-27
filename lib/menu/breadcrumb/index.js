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
var views = require("./wml/breadcrumb");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
///classNames:begin
exports.BREADCRUMB_MENU = 'ww-breadcrumb-menu';
///classNames:end
var item_1 = require("../item");
exports.Item = item_1.Item;
var link_1 = require("../../content/link");
exports.Link = link_1.Link;
/**
 * BreadcrumbMenu
 */
var BreadcrumbMenu = /** @class */ (function (_super) {
    __extends(BreadcrumbMenu, _super);
    function BreadcrumbMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                id: (_this.attrs.ww && _this.attrs.ww.id) ? _this.attrs.ww.id : '',
                className: util_1.concat(exports.BREADCRUMB_MENU, (_this.attrs.ww && _this.attrs.ww.className) ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return BreadcrumbMenu;
}(wml_1.Component));
exports.BreadcrumbMenu = BreadcrumbMenu;
//# sourceMappingURL=index.js.map