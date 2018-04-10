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
var views = require("./wml/link");
var util_1 = require("../../../util");
var active_1 = require("../../state/active");
///classNames:begin
/**
 * LINK
 */
exports.LINK = 'ww-link';
/**
 * LinkClickedEvent indicates an Link has been clicked.
 */
var LinkClickedEvent = /** @class */ (function () {
    function LinkClickedEvent(name, href) {
        this.name = name;
        this.href = href;
    }
    return LinkClickedEvent;
}());
exports.LinkClickedEvent = LinkClickedEvent;
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
         * href assigned to this Link
         */
        _this.href = (_this.attrs.ww && _this.attrs.ww.href) ?
            _this.attrs.ww.href : '';
        _this.values = {
            a: {
                id: 'root',
                disabled: _this.attrs.ww.disabled || null,
                class: util_1.concat(exports.LINK, _this.attrs.ww ? _this.attrs.ww.class : '', (_this.attrs.ww && _this.attrs.ww.active) ?
                    active_1.ACTIVE : ''),
                title: (_this.attrs.ww && _this.attrs.ww.title) ?
                    _this.attrs.ww.title : null,
                name: (_this.attrs.ww && _this.attrs.ww.name) ?
                    _this.attrs.ww.name : null,
                href: (_this.attrs.ww && _this.attrs.ww.href) ?
                    _this.attrs.ww.href : '#',
                active: (_this.attrs.ww && _this.attrs.ww.active) ?
                    _this.attrs.ww.active : false,
                content: function () { return (_this.attrs.ww && _this.attrs.ww.text) ?
                    _this.attrs.ww.text : _this.children; },
                clicked: function (e) {
                    if (_this.attrs.ww) {
                        var _a = _this.attrs.ww, name_1 = _a.name, href = _a.href, onClick = _a.onClick;
                        if (!href)
                            e.preventDefault();
                        if (onClick)
                            onClick(new LinkClickedEvent(name_1, href));
                    }
                }
            }
        };
        return _this;
    }
    /**
      * activate this nav list Item.
      */
    Link.prototype.activate = function () {
        this.view.findById(this.values.a.id)
            .map(function (w) {
            w.classList.remove(active_1.ACTIVE);
            w.classList.add(active_1.ACTIVE);
        });
        return this;
    };
    /**
     * deactivate this nav list item.
     */
    Link.prototype.deactivate = function () {
        this.view.findById(this.values.a.id)
            .map(function (w) { return w.classList.remove(active_1.ACTIVE); });
        return this;
    };
    return Link;
}(wml.Component));
exports.Link = Link;
//# sourceMappingURL=index.js.map