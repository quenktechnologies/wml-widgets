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
var util = require("../../util");
var views = require("./wml/nav");
var orientation_1 = require("../orientation");
///classNames:begin
/**
 * NAV
 */
exports.NAV = 'ww-nav';
/**
 * Nav provides styling for displaying a list of anchor links.
 */
var Nav = /** @class */ (function (_super) {
    __extends(Nav, _super);
    function Nav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                class: util.concat(exports.NAV, _this.attrs.ww && _this.attrs.ww.class, _this.attrs.ww && _this.attrs.ww.vertical && orientation_1.VERTICAL)
            }
        };
        return _this;
    }
    return Nav;
}(wml.Component));
exports.Nav = Nav;
//# sourceMappingURL=index.js.map