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
var wml = require("@quenk/wml");
var views = require("./wml/nav-header");
var util_1 = require("../../../util");
///classNames:begin
/**
 * NAV_HEADER
 */
exports.NAV_HEADER = 'ww-nav-header';
/**
 * NavHeader can be used to display non-clickable heading text in a nav list.
 */
var NavHeader = /** @class */ (function (_super) {
    __extends(NavHeader, _super);
    function NavHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            item: {
                class: ''
            },
            span: {
                class: util_1.concat(exports.NAV_HEADER, _this.attrs.ww ? _this.attrs.ww.class : '')
            },
            text: (_this.attrs.ww && _this.attrs.ww.text) ?
                _this.attrs.ww.text : null
        };
        return _this;
    }
    return NavHeader;
}(wml.Component));
exports.NavHeader = NavHeader;
//# sourceMappingURL=index.js.map