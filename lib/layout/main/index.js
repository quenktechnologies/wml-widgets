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
var views = require("./wml/main");
var util_1 = require("../../util");
var __1 = require("../");
///classNames:begin
exports.MAIN_LAYOUT = 'ww-main-layout';
/**
 * MainLayout provides a container for the main content of an application.
 */
var MainLayout = /** @class */ (function (_super) {
    __extends(MainLayout, _super);
    function MainLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            content: {
                wml: {
                    id: 'main'
                },
                id: (_this.attrs && _this.attrs.ww) ? _this.attrs.ww.id : '',
                className: util_1.concat(exports.MAIN_LAYOUT, __1.LAYOUT, (_this.attrs && _this.attrs.ww) ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return MainLayout;
}(__1.AbstractLayout));
exports.MainLayout = MainLayout;
//# sourceMappingURL=index.js.map