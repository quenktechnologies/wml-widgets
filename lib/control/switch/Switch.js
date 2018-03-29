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
var names = require("@package/wml-widgets/common/names");
var wml_1 = require("@quenk/wml");
var switch_1 = require("./wml/switch");
var SwitchChangedEvent_1 = require("./SwitchChangedEvent");
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
                label: names.SWITCH,
                slider: names.SWITCH_SLIDER
            },
            input: {
                name: _this.attrs.ww.name,
                on: _this.attrs.ww.on || false,
                disabled: _this.attrs.ww.disabled ? true : null,
                onChange: function () {
                    _this.values.input.on = !_this.values.input.on;
                    if (_this.attrs.ww.onChange)
                        _this.attrs.ww.onChange(new SwitchChangedEvent_1.SwitchChangedEvent(_this.values.input.name, _this.values.input.on));
                }
            }
        };
        return _this;
    }
    return Switch;
}(wml_1.Component));
exports.Switch = Switch;
//# sourceMappingURL=Switch.js.map