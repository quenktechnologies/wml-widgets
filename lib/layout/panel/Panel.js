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
var names = require("@package/self/common/names");
var views = require("./wml/panel");
var wml_1 = require("@quenk/wml");
var util_1 = require("@package/self/common/util");
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Panel(_this);
        _this.values = {
            class: {
                root: util_1.concat(names.PANEL, _this.attrs.ww ?
                    _this.attrs.ww.style : names.DEFAULT, _this.attrs.ww ?
                    _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Panel;
}(wml_1.Component));
exports.Panel = Panel;
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Header(_this);
        _this.values = {
            class: {
                root: util_1.concat(names.PANEL_HEADER, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Header;
}(wml_1.Component));
exports.Header = Header;
var Body = /** @class */ (function (_super) {
    __extends(Body, _super);
    function Body() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Body(_this);
        _this.values = {
            class: {
                root: util_1.concat(names.PANEL_BODY, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Body;
}(wml_1.Component));
exports.Body = Body;
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Footer(_this);
        _this.values = {
            class: {
                root: util_1.concat(names.PANEL_FOOTER, _this.attrs.ww ? _this.attrs.ww.class : '')
            }
        };
        return _this;
    }
    return Footer;
}(wml_1.Component));
exports.Footer = Footer;
//# sourceMappingURL=Panel.js.map