"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextField = exports.TEXT_FIELD = exports.TextChangedEvent = void 0;
const views = require("./wml/text-field");
const record_1 = require("@quenk/noni/lib/data/record");
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
                className: (0, util_1.concat)(exports.TEXT_FIELD, (0, __1.getClassName)(this.attrs), (0, feedback_1.getValidityClassName)(this.attrs))
            },
            messages: {
                wml: {
                    id: 'message'
                },
                text: (0, feedback_1.getMessage)(this.attrs)
            },
            label: {
                id: (0, __2.getName)(this.attrs),
                text: (0, form_1.getLabel)(this.attrs)
            },
            control: {
                wml: {
                    id: 'root'
                },
                attrs: (0, record_1.merge)(this.attrs.html || {}, {
                    id: (0, __1.getId)(this.attrs),
                    name: (0, __2.getName)(this.attrs),
                    type: (this.attrs && this.attrs.type) ?
                        this.attrs.type : 'text',
                    min: (this.attrs && this.attrs.min) ?
                        this.attrs.min : undefined,
                    max: (this.attrs && this.attrs.max) ?
                        this.attrs.max : undefined,
                    focus: (this.attrs && this.attrs.focus) ?
                        this.attrs.focus : undefined,
                    placeholder: (this.attrs && this.attrs.placeholder) ?
                        this.attrs.placeholder : '',
                    match: (this.attrs && this.attrs.match) ?
                        this.attrs.match : undefined,
                    length: (this.attrs && this.attrs.length) ?
                        this.attrs.length : undefined,
                    value: (this.attrs && this.attrs.value) ?
                        this.attrs.value : '',
                    disabled: (this.attrs && this.attrs.disabled) ? true : undefined,
                    readOnly: (this.attrs && this.attrs.readOnly) ?
                        true : undefined,
                    rows: (this.attrs && this.attrs.rows) ?
                        this.attrs.rows : 1,
                    oninput: (this.attrs && this.attrs.onChange) ?
                        oninput(this) : () => { },
                    onChange: (this.attrs && this.attrs.onChange) ?
                        this.attrs.onChange : () => { }
                })
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
const getHelp = (t) => (0, util_1.getById)(t.view, t.values.messages.wml.id);
const oninput = (f) => (e) => {
    if (f.attrs && f.attrs && f.attrs.onChange)
        f.attrs.onChange(new text_input_1.TextChangedEvent((f.attrs && f.attrs.name) ?
            f.attrs.name : '', e.target.value));
};
//# sourceMappingURL=index.js.map