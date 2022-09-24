"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = exports.SwitchChangedEvent = exports.SWITCH_SLIDER = exports.SWITCH = void 0;
const util_1 = require("../../util");
const __1 = require("../../");
const __2 = require("../");
const switch_1 = require("./wml/switch");
///classNames:begin
exports.SWITCH = 'ww-switch';
exports.SWITCH_SLIDER = 'ww-switch__slider';
/**
 * SwitchChangedEvent signals the user has changed the switch.
 */
class SwitchChangedEvent extends __2.Event {
}
exports.SwitchChangedEvent = SwitchChangedEvent;
/**
 * Switch allows the user to select between one or two values.
 */
class Switch extends __2.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = new switch_1.Main(this);
        this.values = {
            root: {
                id: (0, __1.getId)(this.attrs),
                className: (0, util_1.concat)(exports.SWITCH, (0, __1.getClassName)(this.attrs))
            },
            slider: {
                className: exports.SWITCH_SLIDER
            },
            input: {
                name: (0, __2.getName)(this.attrs),
                value: (this.attrs && this.attrs.value) ?
                    this.attrs.value : false,
                checked: () => this.values.input.value ? true : undefined,
                disabled: (0, __2.getDisabled)(this.attrs),
                onChange: () => {
                    this.values.input.value = (!this.values.input.value);
                    if ((this.attrs && this.attrs.onChange))
                        this.attrs.onChange(new SwitchChangedEvent(this.values.input.name, this.values.input.value));
                }
            }
        };
    }
}
exports.Switch = Switch;
//# sourceMappingURL=index.js.map