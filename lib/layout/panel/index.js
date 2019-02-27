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
var style = require("../../content/style");
var views = require("./wml/panel");
var util_1 = require("../../util");
var __1 = require("..");
///classNames:begin
/**
 * PANEL wrapper class.
 */
exports.PANEL = 'ww-panel';
/**
 * PANEL_HEADER class name.
 */
exports.PANEL_HEADER = 'ww-panel__header';
/**
 * PANEL_BODY class name.
 */
exports.PANEL_BODY = 'ww-panel__body';
/**
 * PANEL_FOOTER class name.
 */
exports.PANEL_FOOTER = 'ww-panel__footer';
/**
 * Panel provides a rectangular container for visually seperating
 * content by context.
 */
var Panel = /** @class */ (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Panel(_this);
        /**
         * values
         */
        _this.values = {
            /**
             * root values.
             */
            content: {
                id: _this.attrs.ww && _this.attrs.ww.id,
                wml: {
                    id: 'panel',
                },
                className: util_1.concat(exports.PANEL, __1.LAYOUT, (_this.attrs.ww && _this.attrs.ww.style) ?
                    "-" + _this.attrs.ww.style : style.DEFAULT, _this.attrs.ww && _this.attrs.ww.className ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return Panel;
}(__1.AbstractLayout));
exports.Panel = Panel;
/**
 * PanelHeader
 */
var PanelHeader = /** @class */ (function (_super) {
    __extends(PanelHeader, _super);
    function PanelHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.PanelHeader(_this);
        /**
         * values
         */
        _this.values = {
            content: {
                wml: {
                    id: 'header'
                },
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: util_1.concat(exports.PANEL_HEADER, __1.LAYOUT, _this.attrs.ww && _this.attrs.ww.className ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return PanelHeader;
}(__1.AbstractLayout));
exports.PanelHeader = PanelHeader;
/**
 * PanelBody
 */
var PanelBody = /** @class */ (function (_super) {
    __extends(PanelBody, _super);
    function PanelBody() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.PanelBody(_this);
        /**
         * values
         */
        _this.values = {
            content: {
                wml: {
                    id: 'body'
                },
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: util_1.concat(exports.PANEL_BODY, __1.LAYOUT, _this.attrs.ww && _this.attrs.ww.className ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return PanelBody;
}(__1.AbstractLayout));
exports.PanelBody = PanelBody;
/**
 * PanelFooter
 */
var PanelFooter = /** @class */ (function (_super) {
    __extends(PanelFooter, _super);
    function PanelFooter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.PanelFooter(_this);
        /**
         * values
         */
        _this.values = {
            content: {
                wml: {
                    id: 'footer'
                },
                id: _this.attrs.ww && _this.attrs.ww.id,
                className: util_1.concat(exports.PANEL_FOOTER, __1.LAYOUT, _this.attrs.ww && _this.attrs.ww.className ?
                    _this.attrs.ww.className : '')
            }
        };
        return _this;
    }
    return PanelFooter;
}(__1.AbstractLayout));
exports.PanelFooter = PanelFooter;
//# sourceMappingURL=index.js.map