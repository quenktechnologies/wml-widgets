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
var names = require("../../common/names");
var views = require("./wml/header");
var util_1 = require("../../common/util");
/**
 * Header is used to clearly separate headings from
 * the rest of content.
 */
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            class: {
                root: util_1.concat(names.HEADER, _this.attrs.ww ? _this.attrs.ww.class : '')
            },
            text: (_this.attrs.ww && _this.attrs.ww.text) ?
                _this.attrs.ww.text : ''
        };
        return _this;
    }
    return Header;
}(wml.Component));
exports.Header = Header;
//# sourceMappingURL=Header.js.map