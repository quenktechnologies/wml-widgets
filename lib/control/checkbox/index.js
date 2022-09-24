"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = exports.CheckChangedEvent = exports.CHECKBOX = void 0;
const checkbox_1 = require("./wml/checkbox");
const util_1 = require("../../util");
const __1 = require("../");
const __2 = require("../../");
///classNames:begin
exports.CHECKBOX = 'ww-checkbox';
/**
 * CheckChangedEvent signals the user has changed the checkbox state.
 */
class CheckChangedEvent extends __1.Event {
}
exports.CheckChangedEvent = CheckChangedEvent;
/**
 * Checkbox control.
 *
 * This is an alternative to the native checkbox that can be styled.
 */
class Checkbox extends __1.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = new checkbox_1.Main(this);
        this.values = {
            root: {
                id: (0, __2.getId)(this.attrs),
                className: (0, util_1.concat)(exports.CHECKBOX, (0, __2.getClassName)(this.attrs))
            },
            input: {
                name: (0, __1.getName)(this.attrs),
                value: (this.attrs && this.attrs.value) ?
                    this.attrs.value : null,
                onChange: () => {
                    this.values.input.value = (!this.values.input.value) || null;
                    if (this.attrs && this.attrs.onChange)
                        this.attrs.onChange(new CheckChangedEvent(this.values.input.name, this.values.input.value || false));
                }
            }
        };
    }
}
exports.Checkbox = Checkbox;
//# sourceMappingURL=index.js.map