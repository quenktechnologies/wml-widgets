"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextField = exports.TEXT_FIELD = exports.TextChangedEvent = void 0;
const views = require("./wml/text-field");
const util_1 = require("../../util");
const feedback_1 = require("../feedback");
const form_1 = require("../form");
const text_input_1 = require("../text-input");
Object.defineProperty(exports, "TextChangedEvent", { enumerable: true, get: function () { return text_input_1.TextChangedEvent; } });
const __1 = require("../../");
const __2 = require("../");
///classNames:begin
exports.TEXT_FIELD = 'ww-text-field';
/**
 * TextField provides a wrapped native text input control.
 */
class TextField extends form_1.AbstractFormControl {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                className: util_1.concat(exports.TEXT_FIELD, __1.getClassName(this.attrs), feedback_1.getValidityClassName(this.attrs))
            },
            messages: {
                wml: {
                    id: 'message'
                },
                text: feedback_1.getMessage(this.attrs)
            },
            label: {
                id: __2.getName(this.attrs),
                text: form_1.getLabel(this.attrs)
            },
            control: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(this.attrs),
                name: __2.getName(this.attrs),
                type: (this.attrs.ww && this.attrs.ww.type) ?
                    this.attrs.ww.type : 'text',
                min: (this.attrs.ww && this.attrs.ww.min) ?
                    this.attrs.ww.min : undefined,
                max: (this.attrs.ww && this.attrs.ww.max) ?
                    this.attrs.ww.max : undefined,
                focus: (this.attrs.ww && this.attrs.ww.focus) ?
                    this.attrs.ww.focus : undefined,
                placeholder: (this.attrs.ww && this.attrs.ww.placeholder) ?
                    this.attrs.ww.placeholder : '',
                match: (this.attrs.ww && this.attrs.ww.match) ?
                    this.attrs.ww.match : undefined,
                length: (this.attrs.ww && this.attrs.ww.length) ?
                    this.attrs.ww.length : undefined,
                value: (this.attrs.ww && this.attrs.ww.value) ?
                    this.attrs.ww.value : '',
                disabled: (this.attrs.ww && this.attrs.ww.disabled) ? true : undefined,
                readOnly: (this.attrs.ww && this.attrs.ww.readOnly) ?
                    true : undefined,
                rows: (this.attrs.ww && this.attrs.ww.rows) ?
                    this.attrs.ww.rows : 1,
                oninput: (this.attrs.ww && this.attrs.ww.onChange) ?
                    oninput(this) : () => { },
                onChange: (this.attrs.ww && this.attrs.ww.onChange) ?
                    this.attrs.ww.onChange : () => { }
            }
        };
    }
    setMessage(msg) {
        getHelp(this).map(h => h.setMessage(msg));
        return this;
    }
    removeMessage() {
        getHelp(this).map(h => h.removeMessage());
        return this;
    }
}
exports.TextField = TextField;
const getHelp = (t) => util_1.getById(t.view, t.values.messages.wml.id);
const oninput = (f) => (e) => {
    if (f.attrs.ww && f.attrs.ww && f.attrs.ww.onChange)
        f.attrs.ww.onChange(new text_input_1.TextChangedEvent((f.attrs.ww && f.attrs.ww.name) ?
            f.attrs.ww.name : '', e.target.value));
};
//# sourceMappingURL=index.js.map