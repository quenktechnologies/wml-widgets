"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateField = exports.DateChangedEvent = exports.DATE_FIELD_INPUT = exports.DATE_FIELD = void 0;
const datetime_1 = require("@quenk/noni/lib/data/datetime");
const util_1 = require("../../util");
const feedback_1 = require("../feedback");
const form_1 = require("../form");
const __1 = require("../../");
const __2 = require("../");
const views_1 = require("./views");
const DELAY = 400;
///classNames:begin
exports.DATE_FIELD = 'ww-date-field';
exports.DATE_FIELD_INPUT = 'ww-date-field__input';
/**
 * DateChangedEvent is generated when a valid date has been entered.
 *
 * The value is a truncated ISO8601 string consisting of the date part alone or
 * an empty string if the value has been removed.
 */
class DateChangedEvent extends __2.Event {
}
exports.DateChangedEvent = DateChangedEvent;
/**
 * DateField provides a text field for entering dates in ISO8601 format .
 *
 * It will only fire change events when the value of the input is deemed to be
 * valid or has been cleared. If the user removes focus and the entry is not
 * valid, it will be ignored.
 */
class DateField extends form_1.AbstractFormControl {
    constructor() {
        super(...arguments);
        this.view = new views_1.DateFieldView(this);
        this.values = {
            root: {
                wml: { id: 'root' },
                id: (0, __1.getId)(this.attrs),
                className: (0, util_1.concat)(exports.DATE_FIELD, (0, __1.getClassName)(this.attrs), (0, feedback_1.getValidityClassName)(this.attrs)),
            },
            control: {
                wml: { id: 'input' },
                id: (0, __1.getId)(this.attrs)
            },
            label: {
                id: (this.attrs && this.attrs.name) || '',
                text: (this.attrs && this.attrs.label) || ''
            },
            messages: {
                wml: { id: 'messages' },
                text: (0, feedback_1.getMessage)(this.attrs)
            },
            input: {
                wml: { id: 'input' },
                className: exports.DATE_FIELD_INPUT,
                name: (0, __2.getName)(this.attrs),
                placeholder: 'YYYY-DD-MM',
                value: (0, datetime_1.parseDate)(this.attrs.value || ''),
                disabled: (this.attrs && this.attrs.disabled === true) ?
                    true : null,
                onfocus: (e) => {
                    e.target.select();
                },
                oninput: (e) => {
                    this.values.input.onkeyup(e);
                },
                onkeyup: (0, util_1.debounce)((e) => {
                    let value = e.target.value;
                    if (value === '') {
                        this.values.input.value = '';
                        this.fireChange();
                    }
                    else {
                        let val = (0, datetime_1.parseDate)(value);
                        if (val !== '') {
                            this.values.input.value = val;
                            this.fireChange();
                        }
                    }
                }, DELAY),
                onblur: (0, util_1.debounce)(() => {
                    this.view.invalidate();
                }, DELAY * 2)
            }
        };
    }
    /**
     * @private
     */
    fireChange() {
        if (this.attrs.onChange != null)
            this.attrs.onChange(new DateChangedEvent(this.attrs.name || '', this.values.input.value));
    }
    setMessage(msg) {
        this.values.messages.text = msg;
        (0, form_1.setMessage)(this.view, this.values.messages.wml.id, msg);
        return this;
    }
    removeMessage() {
        this.values.messages.text = '';
        (0, form_1.removeMessage)(this.view, this.values.messages.wml.id);
        return this;
    }
}
exports.DateField = DateField;
//# sourceMappingURL=index.js.map