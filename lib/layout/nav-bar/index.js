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
exports.NavBar = exports.NAV_BAR = void 0;
var wml_1 = require("@quenk/wml");
var type_1 = require("@quenk/noni/lib/data/type");
var record_1 = require("@quenk/noni/lib/data/record");
var __1 = require("../..");
var util_1 = require("../../util");
var nav_bar_1 = require("./views/nav-bar");
///classNames:begin
exports.NAV_BAR = 'ww-nav-bar';
/**
 * NavBar provides a vertical bar across the viewport that can be used for
 * displaying navigational links.
 */
var NavBar = /** @class */ (function (_super) {
    __extends(NavBar, _super);
    function NavBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new nav_bar_1.NavBarView(_this);
        _this.values = {
            wml: {
                id: 'root'
            },
            id: (0, __1.getId)(_this.attrs),
            className: (0, util_1.concat)(exports.NAV_BAR, (0, __1.getClassName)(_this.attrs)),
            links: _this.attrs.links ? normalize(_this.attrs.links) : []
        };
        return _this;
    }
    return NavBar;
}(wml_1.Component));
exports.NavBar = NavBar;
var normalize = function (specs) {
    if (Array.isArray(specs))
        return specs;
    else
        return (0, record_1.mapTo)(specs, function (conf, title) {
            if ((0, type_1.isString)(conf))
                return { name: title, title: title, href: conf };
            else if ((0, type_1.isFunction)(conf))
                return { name: title, title: title, onClick: conf };
            else
                return (0, record_1.merge)({ title: title, name: title }, conf);
        });
};
//# sourceMappingURL=index.js.map