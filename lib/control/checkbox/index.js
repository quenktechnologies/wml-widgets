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
                id: __2.getId(this.attrs),
                className: util_1.concat(exports.CHECKBOX, __2.getClassName(this.attrs))
            },
            input: {
                name: __1.getName(this.attrs),
                value: (this.attrs.ww && this.attrs.ww.value) ?
                    this.attrs.ww.value : null,
                onChange: () => {
                    this.values.input.value = (!this.values.input.value) || null;
                    if (this.attrs.ww && this.attrs.ww.onChange)
                        this.attrs.ww.onChange(new CheckChangedEvent(this.values.input.name, this.values.input.value || false));
                }
            }
        };
    }
}
exports.Checkbox = Checkbox;
//# sourceMappingURL=index.js.map