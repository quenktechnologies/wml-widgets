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
var views = require("./wml/button");
var classNames = require("./classNames");
var class_names_1 = require("@package/wml-widgets/util/class-names");
var util_1 = require("@package/wml-widgets/util");
var _1 = require(".");
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
                    util_1.concat(Button.CLASS_NAME, _this.attrs.ww.class, _this.attrs.ww.style || Button.styles.DEFAULT, _this.attrs.ww.size && _this.attrs.ww.size, _this.attrs.ww.outline && class_names_1.features.OUTLINE, _this.attrs.ww.block && class_names_1.features.BLOCK, _this.attrs.ww.active && class_names_1.states.ACTIVE) :
                    Button.CLASS_NAME,
                type: (_this.attrs.ww && _this.attrs.ww.type) ? _this.attrs.ww.type : 'button',
                name: (_this.attrs.ww && _this.attrs.ww.name) ? _this.attrs.ww.name : '',
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled) ? true : null,
                onclick: function () { return _this.attrs.ww &&
                    _this.attrs.ww.onClick &&
                    _this.attrs.ww.onClick(new _1.ButtonClickedEvent(_this.attrs.ww.name || '')); },
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
    /**
     * NAME
     */
    Button.CLASS_NAME = classNames.BUTTON;
    /**
     * styles the Button supports.
     */
    Button.styles = class_names_1.styles;
    return Button;
}(wml.Component));
exports.Button = Button;
//# sourceMappingURL=Button.js.map