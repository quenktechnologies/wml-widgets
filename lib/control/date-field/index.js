"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateField = exports.DateChangedEvent = exports.Format = exports.usFormats = exports.commonFormats = exports.iso8601Formats = exports.YESTERDAY = exports.NOW = exports.TODAY = exports.DELAY = exports.VALUE_FORMAT = exports.DEFAULT_INPUT_DISPLAY = exports.DEFAULT_INPUT_PLACEHOLDER = exports.DEFAULT_INPUT_FORMAT = exports.DATE_FIELD_INPUT = exports.DATE_FIELD = void 0;
const views = require("./wml/date-field");
const moment = require("moment");
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const util_1 = require("../../util");
const feedback_1 = require("../feedback");
const form_1 = require("../form");
const __1 = require("../../");
const __2 = require("../");
const orientation_1 = require("../../content/orientation");
///classNames:begin
exports.DATE_FIELD = 'ww-date-field';
exports.DATE_FIELD_INPUT = 'ww-date-field__input';
///classNames:end
exports.DEFAULT_INPUT_FORMAT = moment.ISO_8601;
exports.DEFAULT_INPUT_PLACEHOLDER = 'YYYY-MM-DD';
exports.DEFAULT_INPUT_DISPLAY = 'YYYY-MM-DD';
exports.VALUE_FORMAT = 'YYYY-MM-DD';
exports.DELAY = 200;
exports.TODAY = 'today';
exports.NOW = 'now';
exports.YESTERDAY = 'yesterday';
exports.iso8601Formats = [
    'YYYY-MM-DD',
    'YYYY-MM-D',
    'YYYY-M-DD',
    'YYYY-M-D',
    'YY-MM-DD',
    'YY-MM-D',
    'YY-M-DD',
    'YY-M-D',
    'YYYY/MM/DD',
    'YYYY/MM/D',
    'YYYY/M/DD',
    'YYYY/M/D',
    'YY/MM/DD',
    'YY/MM/D',
    'YY/M/DD',
    'YY/M/D',
    'YYYY MM DD',
    'YYYY MM D',
    'YYYY M DD',
    'YYYY M D',
    'YY MM DD',
    'YY MM D',
    'YY M DD',
    'YY M D',
    'YYYYMMDD',
    'YYYYMMD',
    'YYYYMDD',
    'YYYYMD',
    'YYMMDD',
    'YYMMD',
    'YYMDD',
    'YYMD',
];
exports.commonFormats = [
    'DD-MM-YYYY',
    'D-MM-YYYY',
    'DD-M-YYYY',
    'D-M-YYYY',
    'DD-MM-YY',
    'D-MM-YY',
    'DD-M-YY',
    'D-M-YY',
    'DD/MM/YYYY',
    'D/MM/YYYY',
    'DD/M/YYYY',
    'D/M/YYYY',
    'DD/MM/YY',
    'D/MM/YY',
    'DD/M/YY',
    'D/M/YY',
    'DD MM YYYY',
    'D MM YYYY',
    'DD M YYYY',
    'D M YYYY',
    'DD MM YY',
    'D MM YY',
    'DD M YY',
    'D M YY',
    'DDMMYYYY',
    'DMMYYYY',
    'DDMYYYY',
    'DMYYYY',
    'DDMMYY',
    'DMMYY',
    'DDMYY',
    'DMYY',
];
exports.usFormats = [
    'MM-DD-YYYY',
    'MM-D-YYYY',
    'M-DD-YYYY',
    'M-D-YYYY',
    'MM-DD-YY',
    'MM-D-YY',
    'M-DD-YY',
    'M-D-YY',
    'MM/DD/YYYY',
    'MM/D/YYYY',
    'M/DD/YYYY',
    'M/D/YYYY',
    'MM/DD/YY',
    'MM/D/YY',
    'M/DD/YY',
    'M/D/YY',
    'MM DD YYYY',
    'MM D YYYY',
    'M DD YYYY',
    'M D YYYY',
    'MM DD YY',
    'MM D YY',
    'M DD YY',
    'M D YY',
    'MMDDYYYY',
    'MMDYYYY',
    'MDDYYYY',
    'MDYYYY',
    'MMDDYY',
    'MMDYY',
    'MDDYY',
    'MDYY',
];
/**
 * Format is used to determine what format input should be parsed as.
 */
var Format;
(function (Format) {
    Format[Format["ISO8601"] = 1] = "ISO8601";
    Format[Format["COMMON"] = 2] = "COMMON";
    Format[Format["USA"] = 3] = "USA";
})(Format = exports.Format || (exports.Format = {}));
/**
 * DateChangedEvent is generated when a valid date has been entered.
 *
 * The value is a truncated ISO8601 string consisting of the date part alone.
 */
class DateChangedEvent extends __2.Event {
}
exports.DateChangedEvent = DateChangedEvent;
/**
 * DateField provides a text field for entering dates.
 *
 * It will only fire change events when the date input matches one
 * of the 3 format sets (ISO8601,Common,US).
 *
 * If the user removes focus and the entry is not valid, it will be ignored
 * and no change event will be fired. Once a valid date has been entered,
 * the value displayed can be formated using the format specified in the
 * "display" attribute. This does not affect the actual value provided
 * to onChange handlers.
 */
class DateField extends form_1.AbstractFormControl {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                wml: { id: 'root' },
                id: (0, __1.getId)(this.attrs),
                className: (0, util_1.concat)(exports.DATE_FIELD, (0, __1.getClassName)(this.attrs), (0, orientation_1.getBlockClassName)(this.attrs), (0, feedback_1.getValidityClassName)(this.attrs)),
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
                wml: {
                    id: 'messages'
                },
                text: (0, feedback_1.getMessage)(this.attrs)
            },
            input: {
                wml: { id: 'input' },
                className: exports.DATE_FIELD_INPUT,
                name: (0, __2.getName)(this.attrs),
                format: getFormat(this.attrs),
                placeholder: getPlaceholder(this.attrs),
                display: getDisplay(this.attrs),
                moment: ((this.attrs && this.attrs.value) ?
                    (0, maybe_1.just)(parseDate(getValue(this.attrs), getFormat(this.attrs))) :
                    (0, maybe_1.nothing)()),
                value: () => (this.values.input.moment.isJust() &&
                    this.values.input.moment.get().isValid()) ?
                    this.values.input.moment.get().format(this.values.input.display) : '',
                disabled: (this.attrs && this.attrs.disabled === true) ?
                    true : null,
                onfocus: (e) => {
                    e.target.select();
                },
                oninput: (e) => {
                    e.target.oninput = null;
                    this.values.input.onkeyup(e);
                },
                onkeyup: (0, util_1.debounce)((e) => {
                    let value = e.target.value;
                    if (value === '') {
                        this.values.input.moment = (0, maybe_1.nothing)();
                        this.fireChange();
                    }
                    else {
                        let m = parseDate(value, this.values.input.format);
                        if (m.isValid()) {
                            this.values.input.moment = (0, maybe_1.just)(m);
                            this.fireChange();
                        }
                    }
                }, exports.DELAY),
                onblur: () => {
                    this.view.invalidate();
                }
            }
        };
    }
    /**
     * @private
     */
    fireChange() {
        if (this.attrs && this.attrs.onChange) {
            let name = this.attrs.name || '';
            if (this.values.input.moment.isJust()) {
                let m = this.values.input.moment.get();
                if (m.isValid())
                    this.attrs.onChange(new DateChangedEvent(name, m.format(exports.VALUE_FORMAT)));
            }
            else {
                this.attrs.onChange(new DateChangedEvent(name, undefined));
            }
        }
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
const parseDate = (d, formats) => {
    let str = d.toLowerCase();
    if ((str === exports.TODAY) || (str === exports.NOW)) {
        return moment.utc();
    }
    else if (str === exports.YESTERDAY) {
        return moment.utc().subtract(1, 'd');
    }
    else {
        return moment.utc(d, [...formats, moment.ISO_8601], true);
    }
};
const getValue = (attrs) => (attrs && attrs.value) ? attrs.value : '';
const getFormat = (attrs) => {
    if (attrs && attrs.format) {
        switch (attrs.format) {
            case 2:
                return exports.commonFormats;
            case 3:
                return exports.usFormats;
            default:
                break;
        }
    }
    return exports.iso8601Formats;
};
const getPlaceholder = (attrs) => {
    if (attrs && attrs.placeholder)
        return attrs.placeholder;
    if (attrs && attrs.format) {
        switch (attrs.format) {
            case 2:
                return 'DD-MM-YYYY';
            case 3:
                return 'MM-DD-YYYY';
            default:
                return 'YYYY-MM-DD';
        }
    }
    return 'YYYY-MM-DD';
};
const getDisplay = (attrs) => (attrs && attrs.display) ? attrs.display : exports.DEFAULT_INPUT_DISPLAY;
//# sourceMappingURL=index.js.map