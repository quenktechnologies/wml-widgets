"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInput = exports.TextChangedEvent = exports.TEXT_INPUT = void 0;
const views = require("./wml/text-input");
const timer_1 = require("@quenk/noni/lib/control/timer");
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
        this.view = (this.attrs.ww && this.attrs.ww.rows && this.attrs.ww.rows > 1) ?
            new views.Textarea(this) : new views.Input(this);
        this.values = {
            control: {
                wml: {
                    id: 'root'
                }
            },
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.TEXT_INPUT, __1.getClassName(this.attrs), (this.attrs.ww && this.attrs.ww.size) ?
                size_1.getSizeClassName(this.attrs.ww.size) : '', (this.attrs.ww && this.attrs.ww.block) ?
                orientation_1.BLOCK : ''),
            name: __2.getName(this.attrs),
            type: (this.attrs.ww && this.attrs.ww.type) ?
                this.attrs.ww.type : 'text',
            min: (this.attrs.ww && this.attrs.ww.min) ?
                String(this.attrs.ww.min) : null,
            max: (this.attrs.ww && this.attrs.ww.max) ?
                String(this.attrs.ww.max) : null,
            match: new RegExp((this.attrs.ww && this.attrs.ww.match) ?
                this.attrs.ww.match : '.'),
            length: (this.attrs.ww && this.attrs.ww.length) ?
                this.attrs.ww.length : Infinity,
            placeholder: (this.attrs.ww && this.attrs.ww.placeholder) ?
                this.attrs.ww.placeholder : '',
            value: (this.attrs.ww && this.attrs.ww.value) ?
                this.attrs.ww.value : '',
            rows: String((this.attrs.ww && this.attrs.ww.rows) ?
                this.attrs.ww.rows : 1),
            disabled: (this.attrs.ww && this.attrs.ww.disabled === true) ?
                true : null,
            readOnly: (this.attrs.ww && this.attrs.ww.readOnly === true) ?
                true : null,
            onkeydown: (e) => {
                if (e.key.length === 1) {
                    let value = e.target.value || '';
                    if ((!this.values.match.test(e.key)) ||
                        (value.length > this.values.length))
                        e.preventDefault();
                }
            },
            oninput: dispatchInput(this),
            autofocus: (this.attrs.ww && this.attrs.ww.focus) ? true : undefined,
            onfocus: () => {
                if (this.attrs.ww && this.attrs.ww.onFocusGained)
                    this.attrs.ww.onFocusGained(new focus_1.FocusGainedEvent(__2.getName(this.attrs)));
            },
            onblur: () => {
                if (this.attrs.ww && this.attrs.ww.onFocusLost)
                    this.attrs.ww.onFocusLost(new focus_1.FocusLostEvent(__2.getName(this.attrs)));
            }
        };
    }
    rendered() {
        if (this.values.autofocus === true)
            this.focus();
    }
    focus() {
        return timer_1.tick(() => focus_1.focus(this.view, this.values.control.wml.id));
    }
}
exports.TextInput = TextInput;
/**
 * dispatchInput when the user inputs some text.
 */
const dispatchInput = (i) => (e) => {
    if (i.attrs.ww && i.attrs.ww.onChange)
        i.attrs.ww.onChange(new TextChangedEvent((i.attrs && i.attrs.ww.name) ?
            i.attrs.ww.name : '', e.target.value));
};
//# sourceMappingURL=index.js.map