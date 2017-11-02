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
var names = require("@package/self/common/names");
var views = require("./wml/link");
var LinkClickedEvent_1 = require("./LinkClickedEvent");
var util_1 = require("@package/self/common/util");
/**
 * Link generates an <a> element.
 */
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        /**
         * name assigned to this Link.
         */
        _this.name = (_this.attrs.ww && _this.attrs.ww.name) ?
            _this.attrs.ww.name : '';
        /**
         * title assigned to this Link.
         */
        _this.title = (_this.attrs.ww && _this.attrs.ww.title) ?
            _this.attrs.ww.title : '';
        /**
         * href assigned to this link
         */
        _this.href = (_this.attrs.ww && _this.attrs.ww.href) ?
            _this.attrs.ww.href : '';
        _this.values = {
            id: {
                root: 'root'
            },
            class: {
                root: util_1.concat(names.NAV_LINK, _this.attrs.ww ? _this.attrs.ww.class : '', (_this.attrs.ww && _this.attrs.ww.active) ?
                    names.ACTIVE : '')
            },
            a: {
                title: (_this.attrs.ww && _this.attrs.ww.title) ?
                    _this.attrs.ww.title : null,
                name: (_this.attrs.ww && _this.attrs.ww.name) ?
                    _this.attrs.ww.name : null,
                href: (_this.attrs.ww && _this.attrs.ww.href) ?
                    _this.attrs.ww.href : '#',
                active: (_this.attrs.ww && _this.attrs.ww.active) ?
                    _this.attrs.ww.active : false
            }
        };
        _this.clicked = function (e) {
            if (_this.attrs.ww) {
                var _a = _this.attrs.ww, name_1 = _a.name, href = _a.href, onClick = _a.onClick;
                if (!href)
                    e.preventDefault();
                if (onClick)
                    onClick(new LinkClickedEvent_1.LinkClickedEvent(name_1, href));
            }
        };
        return _this;
    }
    /**
      * activate this nav list Item.
      */
    Link.prototype.activate = function () {
        this.view.findById(this.values.id.root)
            .map(function (w) {
            w.classList.remove(names.ACTIVE);
            w.classList.add(names.ACTIVE);
        });
    };
    /**
     * inactivate this nav list item.
     */
    Link.prototype.inactivate = function () {
        this.view.findById(this.values.id.root)
            .map(function (w) { return w.classList.remove(names.ACTIVE); });
    };
    return Link;
}(wml.Component));
exports.Link = Link;
//# sourceMappingURL=Link.js.map