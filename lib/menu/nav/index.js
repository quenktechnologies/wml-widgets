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
exports.Nav = exports.NAV = void 0;
var wml = require("@quenk/wml");
var util = require("../../util");
var views = require("./wml/nav");
var orientation_1 = require("../../content/orientation");
var item_1 = require("../item");
Object.defineProperty(exports, "Item", { enumerable: true, get: function () { return item_1.Item; } });
var link_1 = require("../../content/link");
Object.defineProperty(exports, "Link", { enumerable: true, get: function () { return link_1.Link; } });
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
                id: (_this.attrs.ww && _this.attrs.ww.id) ? _this.attrs.ww.id : '',
                className: util.concat(exports.NAV, (_this.attrs.ww && _this.attrs.ww.className) ?
                    _this.attrs.ww.className : '', (_this.attrs.ww && _this.attrs.ww.vertical) ?
                    orientation_1.VERTICAL : '')
            }
        };
        return _this;
    }
    return Nav;
}(wml.Component));
exports.Nav = Nav;
//# sourceMappingURL=index.js.map