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
exports.Link = exports.LinkClickedEvent = exports.LINK = void 0;
var wml = require("@quenk/wml");
var document = require("@quenk/wml/lib/dom");
var views = require("./views");
var util_1 = require("../../util");
var active_1 = require("../state/active");
var disabled_1 = require("../state/disabled");
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
        _this.view = (_this.attrs.ww && _this.attrs.ww.disabled) ?
            new views.DisabledLinkView(_this) :
            new views.LinkView(_this);
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
            id: (_this.attrs.ww && _this.attrs.ww.id) ?
                _this.attrs.ww.id : '',
            disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ?
                _this.attrs.ww.disabled : null,
            className: util_1.concat(exports.LINK, (_this.attrs.ww && _this.attrs.ww.className) ?
                _this.attrs.ww.className : '', (_this.attrs.ww && _this.attrs.ww.active) ?
                active_1.ACTIVE : '', (_this.attrs.ww && _this.attrs.ww.disabled) ?
                disabled_1.DISABLED : '', (_this.attrs.ww && _this.attrs.ww.disabled) ?
                "-ww-disabled" : ''),
            title: (_this.attrs.ww && _this.attrs.ww.title) ?
                _this.attrs.ww.title : null,
            name: (_this.attrs.ww && _this.attrs.ww.name) ?
                _this.attrs.ww.name : null,
            href: (_this.attrs.ww && _this.attrs.ww.href) ?
                _this.attrs.ww.href : '#',
            active: (_this.attrs.ww && _this.attrs.ww.active) ?
                _this.attrs.ww.active : false,
            //TODO: move to dom lib
            content: (_this.attrs.ww && _this.attrs.ww.text) ?
                [document.createTextNode(_this.attrs.ww.text)] :
                _this.children,
            clicked: function (e) {
                if (_this.attrs.ww && !_this.attrs.ww.disabled) {
                    var _a = _this.attrs.ww, name_1 = _a.name, href = _a.href, onClick = _a.onClick;
                    if (!href)
                        e.preventDefault();
                    if (onClick)
                        onClick(new LinkClickedEvent(name_1, href));
                }
            }
        };
        return _this;
    }
    /**
      * activate this nav list Item.
      */
    Link.prototype.activate = function () {
        var m = util_1.getById(this.view, this.values.id);
        if (m.isJust()) {
            var e = m.get();
            e.classList.remove(active_1.ACTIVE);
            e.classList.add(active_1.ACTIVE);
        }
        return this;
    };
    /**
     * deactivate this nav list item.
     */
    Link.prototype.deactivate = function () {
        var m = util_1.getById(this.view, this.values.id);
        if (m.isJust())
            m.get().classList.remove(active_1.ACTIVE);
        return this;
    };
    return Link;
}(wml.Component));
exports.Link = Link;
//# sourceMappingURL=index.js.map