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
var control_1 = require("../../control");
var switch_1 = require("./wml/switch");
///className:begin
exports.SWITCH = 'ww-switch';
exports.SWITCH_SLIDER = 'ww-switch__slider';
/**
 * SwitchChangedEvent signals the user has changed the switch.
 */
var SwitchChangedEvent = /** @class */ (function (_super) {
    __extends(SwitchChangedEvent, _super);
    function SwitchChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SwitchChangedEvent;
}(control_1.Event));
exports.SwitchChangedEvent = SwitchChangedEvent;
/**
 * Switch allows the user to select between one or two values.
 */
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new switch_1.Main(_this);
        _this.values = {
            class: {
                label: exports.SWITCH,
                slider: exports.SWITCH_SLIDER
            },
            input: {
                name: _this.attrs.ww.name,
                value: _this.attrs.ww.value || false,
                disabled: _this.attrs.ww.disabled ? true : null,
                onChange: function () {
                    _this.values.input.value = !_this.values.input.value;
                    if (_this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(new SwitchChangedEvent(_this.values.input.name, _this.values.input.value));
                }
            }
        };
        return _this;
    }
    return Switch;
}(control_1.GenericControl));
exports.Switch = Switch;
//# sourceMappingURL=index.js.map