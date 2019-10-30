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
var views = require("./wml/button");
var toolbar_1 = require("../toolbar");
var active_1 = require("../../content/state/active");
var orientation_1 = require("../../content/orientation");
var style_1 = require("../../content/style");
exports.Style = style_1.Style;
var size_1 = require("../../content/size");
var util_1 = require("../../util");
var __1 = require("../../");
var __2 = require("../");
///classNames:begin
exports.BUTTON = 'ww-button';
;
/**
 * ButtonClickedEvent
 */
var ButtonClickedEvent = /** @class */ (function (_super) {
    __extends(ButtonClickedEvent, _super);
    function ButtonClickedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ButtonClickedEvent;
}(__2.Event));
exports.ButtonClickedEvent = ButtonClickedEvent;
/**
 * Button is an improvement over HTMLButtionElement
 */
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = (_this.attrs.ww && _this.attrs.ww.anchor) ?
            new views.AnchorView(_this) : new views.ButtonView(_this);
        _this.values = {
            button: {
                wml: {
                    id: 'button'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.BUTTON, __1.getClassName(_this.attrs), toolbar_1.TOOLBAR_COMPAT, (_this.attrs.ww && _this.attrs.ww.style) ?
                    style_1.getStyleClassName(_this.attrs.ww.style) :
                    style_1.DEFAULT, (_this.attrs.ww && _this.attrs.ww.size) ?
                    size_1.getSizeClassName(_this.attrs.ww.size) : '', (_this.attrs.ww && _this.attrs.ww.outline) ?
                    style_1.OUTLINE : '', (_this.attrs.ww && _this.attrs.ww.block) ?
                    orientation_1.BLOCK : '', (_this.attrs.ww && _this.attrs.ww.active) ?
                    active_1.ACTIVE : ''),
                type: (_this.attrs.ww && _this.attrs.ww.type) ?
                    _this.attrs.ww.type : 'button',
                name: (_this.attrs.ww && _this.attrs.ww.name) ? _this.attrs.ww.name : '',
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ? true : null,
                anchor: (_this.attrs.ww && _this.attrs.ww.anchor) ?
                    _this.attrs.ww.anchor : false,
                onclick: function (e) {
                    e.preventDefault();
                    _this.attrs.ww &&
                        _this.attrs.ww.onClick &&
                        _this.attrs.ww.onClick(new ButtonClickedEvent((_this.attrs.ww && _this.attrs.ww.name) ?
                            _this.attrs.ww.name : '', _this.attrs.ww.value));
                },
                content: function () { return (_this.attrs.ww && _this.attrs.ww.text) ?
                    [__1.text(_this.attrs.ww.text)] : _this.children; }
            }
        };
        return _this;
    }
    /**
     * disable this button.
     */
    Button.prototype.disable = function () {
        util_1.getById(this.view, this.values.button.wml.id)
            .map(function (b) { return b.setAttribute('disabled', 'disabled'); });
    };
    /**
     * enable this button.
     */
    Button.prototype.enable = function () {
        util_1.getById(this.view, this.values.button.wml.id)
            .map(function (b) { return b.removeAttribute('disabled'); });
    };
    /**
     * toggle the disabled state of this button.
     */
    Button.prototype.toggle = function () {
        var _this = this;
        util_1.getById(this.view, this.values.button.wml.id)
            .map(function (b) { return b.hasAttribute('disabled') ?
            _this.enable() : _this.disable(); });
    };
    return Button;
}(__2.AbstractControl));
exports.Button = Button;
//# sourceMappingURL=index.js.map