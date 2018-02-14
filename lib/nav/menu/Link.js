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
var link = require("@package/wml-widgets/nav/link");
var names = require("@package/wml-widgets/common/names");
var views = require("./wml/link");
var util_1 = require("@package/wml-widgets/common/util");
/**
 * Link provides a link entry into a nav menu.
 */
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            id: { root: '' },
            class: { root: '' },
            item: {
                class: util_1.concat(names.NAV_MENU_ITEM, (_this.attrs.ww && _this.attrs.ww.active) ? names.ACTIVE : '')
            },
            a: {
                class: util_1.concat((_this.attrs.ww && _this.attrs.ww.active) ?
                    names.ACTIVE : ''),
                title: (_this.attrs.ww && _this.attrs.ww.title) ?
                    _this.attrs.ww.title : '',
                name: (_this.attrs.ww && _this.attrs.ww.name) ?
                    _this.attrs.ww.name : '',
                href: (_this.attrs.ww && _this.attrs.ww.href) ?
                    _this.attrs.ww.href : '#',
                active: (_this.attrs.ww && _this.attrs.ww.active) ?
                    _this.attrs.ww.active : false,
                text: (_this.attrs.ww && _this.attrs.ww.text) ?
                    _this.attrs.ww.text : '',
                onClick: (_this.attrs.ww && _this.attrs.ww.onClick) ?
                    _this.attrs.ww.onClick : null
            }
        };
        return _this;
    }
    return Link;
}(link.Link));
exports.Link = Link;
//# sourceMappingURL=Link.js.map