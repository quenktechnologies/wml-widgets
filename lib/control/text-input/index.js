"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInput = exports.TextChangedEvent = exports.TEXT_INPUT = void 0;
const views = require("./wml/text-input");
const timer_1 = require("@quenk/noni/lib/control/timer");
const record_1 = require("@quenk/noni/lib/data/record");
const util_1 = require("../../util");
const orientation_1 = require("../../content/orientation");
const size_1 = require("../../content/size");
const focus_1 = require("../focus");
const __1 = require("../../");
const __2 = require("../");
///classNames:begin
exports.TEXT_INPUT = 'ww-text-input';
/**
 * TextChangedEvent
 */
class TextChangedEvent extends __2.Event {
}
exports.TextChangedEvent = TextChangedEvent;
/**
 * TextInput provides some extra styling to the native input.
 */
class TextInput extends __2.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = (this.attrs && this.attrs.rows && this.attrs.rows > 1) ?
            new views.Textarea(this) : new views.Input(this);
        this.length = (this.attrs && this.attrs.length) ?
            this.attrs.length : Infinity;
        this.values = {
            control: {
                wml: {
                    id: 'root'
                }
            },
            attrs: (0, record_1.merge)((this.attrs && this.attrs.html) || {}, {
                id: (0, __1.getId)(this.attrs),
                className: (0, util_1.concat)(exports.TEXT_INPUT, (0, __1.getClassName)(this.attrs), (this.attrs && this.attrs.size) ?
                    (0, size_1.getSizeClassName)(this.attrs.size) : '', (this.attrs && this.attrs.block) ?
                    orientation_1.BLOCK : ''),
                name: (0, __2.getName)(this.attrs),
                type: (this.attrs && this.attrs.type) ?
                    this.attrs.type : 'text',
                min: (this.attrs && this.attrs.min) ?
                    String(this.attrs.min) : null,
                max: (this.attrs && this.attrs.max) ?
                    String(this.attrs.max) : null,
                match: new RegExp((this.attrs && this.attrs.match) ?
                    this.attrs.match : '.'),
                value: (this.attrs && this.attrs.value) ?
                    this.attrs.value : '',
                rows: String((this.attrs && this.attrs.rows) ?
                    this.attrs.rows : 1),
                disabled: (this.attrs && this.attrs.disabled === true) ?
                    true : null,
                readOnly: (this.attrs && this.attrs.readOnly === true) ?
                    true : null,
                onkeydown: (e) => {
                    if (e.key.length === 1) {
                        let value = e.target.value || '';
                        if ((!this.values.attrs.match.test(e.key)) ||
                            (value.length > this.length))
                            e.preventDefault();
                    }
                },
                oninput: dispatchInput(this),
                autofocus: (this.attrs && this.attrs.focus) ? true : undefined,
                onfocus: () => {
                    if (this.attrs && this.attrs.onFocusGained)
                        this.attrs.onFocusGained(new focus_1.FocusGainedEvent((0, __2.getName)(this.attrs)));
                },
                onblur: () => {
                    if (this.attrs && this.attrs.onFocusLost)
                        this.attrs.onFocusLost(new focus_1.FocusLostEvent((0, __2.getName)(this.attrs)));
                }
            })
        };
    }
    rendered() {
        if (this.values.attrs.autofocus === true)
            this.focus();
    }
    focus() {
        return (0, timer_1.tick)(() => (0, focus_1.focus)(this.view, this.values.control.wml.id));
    }
}
exports.TextInput = TextInput;
/**
 * dispatchInput when the user inputs some text.
 */
const dispatchInput = (i) => (e) => {
    if (i.attrs && i.attrs.onChange)
        i.attrs.onChange(new TextChangedEvent((i.attrs && i.attrs.name) ?
            i.attrs.name : '', e.target.value));
};
//# sourceMappingURL=index.js.map