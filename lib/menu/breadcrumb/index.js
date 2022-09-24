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
exports.BreadcrumbMenu = exports.Link = exports.Item = exports.BREADCRUMB_MENU = void 0;
var views = require("./wml/breadcrumb");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
///classNames:begin
exports.BREADCRUMB_MENU = 'ww-breadcrumb-menu';
///classNames:end
var item_1 = require("../item");
Object.defineProperty(exports, "Item", { enumerable: true, get: function () { return item_1.Item; } });
var link_1 = require("../../content/link");
Object.defineProperty(exports, "Link", { enumerable: true, get: function () { return link_1.Link; } });
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
                id: (_this.attrs && _this.attrs.id) ? _this.attrs.id : '',
                className: (0, util_1.concat)(exports.BREADCRUMB_MENU, (_this.attrs && _this.attrs.className) ?
                    _this.attrs.className : '')
            }
        };
        return _this;
    }
    return BreadcrumbMenu;
}(wml_1.Component));
exports.BreadcrumbMenu = BreadcrumbMenu;
//# sourceMappingURL=index.js.map