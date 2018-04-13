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
var views = require("./wml/button");
var style = require("../../content/style");
var active = require("../../content/state/active");
var orientation = require("../../content/orientation");
var util_1 = require("../../util");
var toolbar_1 = require("../toolbar");
var _1 = require("../");
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
}(_1.Event));
exports.ButtonClickedEvent = ButtonClickedEvent;
/**
 * Button is an improvement over HTMLButtionElement
 */
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            button: {
                id: 'button',
                class: _this.attrs.ww ?
                    util_1.concat(exports.BUTTON, toolbar_1.TOOLBAR_COMPAT, _this.attrs.ww.style || style.DEFAULT, _this.attrs.ww.size && _this.attrs.ww.size, _this.attrs.ww.outline && style.OUTLINE, _this.attrs.ww.block && orientation.BLOCK, _this.attrs.ww.active && active.ACTIVE, _this.attrs.ww.class) : exports.BUTTON,
                type: (_this.attrs.ww && _this.attrs.ww.type) ? _this.attrs.ww.type : 'button',
                name: (_this.attrs.ww && _this.attrs.ww.name) ? _this.attrs.ww.name : '',
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ? true : null,
                onclick: function () { return _this.attrs.ww &&
                    _this.attrs.ww.onClick &&
                    _this.attrs.ww.onClick(new ButtonClickedEvent(_this.attrs.ww.name || '', _this.attrs.ww.value)); },
                text: (_this.attrs.ww && _this.attrs.ww.text) ? _this.attrs.ww.text : ''
            }
        };
        return _this;
    }
    /**
     * disable this button.
     */
    Button.prototype.disable = function () {
        this
            .view
            .findById(this.values.button.id)
            .map(function (b) { return b.setAttribute('disabled', 'disabled'); });
    };
    /**
     * enable this button.
     */
    Button.prototype.enable = function () {
        this
            .view
            .findById(this.values.button.id)
            .map(function (b) { return b.removeAttribute('disabled'); });
    };
    /**
     * toggle the disabled state of this button.
     */
    Button.prototype.toggle = function () {
        var _this = this;
        this
            .view
            .findById(this.values.button.id)
            .map(function (b) { return b.hasAttribute('disabled') ?
            _this.enable() :
            _this.disable(); });
    };
    return Button;
}(_1.GenericControl));
exports.Button = Button;
//# sourceMappingURL=index.js.map