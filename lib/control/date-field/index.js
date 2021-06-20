"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateField = exports.DateChangedEvent = exports.Format = exports.usFormats = exports.commonFormats = exports.iso8601Formats = exports.YESTERDAY = exports.NOW = exports.TODAY = exports.DELAY = exports.VALUE_FORMAT = exports.DEFAULT_INPUT_DISPLAY = exports.DEFAULT_INPUT_PLACEHOLDER = exports.DEFAULT_INPUT_FORMAT = exports.DATE_FIELD_INPUT = exports.DATE_FIELD = void 0;
var views = require("./wml/date-field");
var moment = require("moment");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var util_1 = require("../../util");
var feedback_1 = require("../feedback");
var form_1 = require("../form");
var __1 = require("../../");
var __2 = require("../");
var orientation_1 = require("../../content/orientation");
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
var DateChangedEvent = /** @class */ (function (_super) {
    __extends(DateChangedEvent, _super);
    function DateChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DateChangedEvent;
}(__2.Event));
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
var DateField = /** @class */ (function (_super) {
    __extends(DateField, _super);
    function DateField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                wml: { id: 'root' },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.DATE_FIELD, __1.getClassName(_this.attrs), orientation_1.getBlockClassName(_this.attrs), feedback_1.getValidityClassName(_this.attrs)),
            },
            control: {
                wml: { id: 'input' },
                id: __1.getId(_this.attrs)
            },
            label: {
                id: (_this.attrs.ww && _this.attrs.ww.name) || '',
                text: (_this.attrs.ww && _this.attrs.ww.label) || ''
            },
            messages: {
                wml: {
                    id: 'messages'
                },
                text: feedback_1.getMessage(_this.attrs)
            },
            input: {
                wml: { id: 'input' },
                className: exports.DATE_FIELD_INPUT,
                name: __2.getName(_this.attrs),
                format: getFormat(_this.attrs),
                placeholder: getPlaceholder(_this.attrs),
                display: getDisplay(_this.attrs),
                moment: ((_this.attrs.ww && _this.attrs.ww.value) ?
                    maybe_1.just(parseDate(getValue(_this.attrs), getFormat(_this.attrs))) :
                    maybe_1.nothing()),
                value: function () { return (_this.values.input.moment.isJust() &&
                    _this.values.input.moment.get().isValid()) ?
                    _this.values.input.moment.get().format(_this.values.input.display) : ''; },
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled === true) ?
                    true : null,
                onfocus: function (e) {
                    e.target.select();
                },
                oninput: function (e) {
                    e.target.oninput = null;
                    _this.values.input.onkeyup(e);
                },
                onkeyup: util_1.debounce(function (e) {
                    var value = e.target.value;
                    if (value === '') {
                        _this.values.input.moment = maybe_1.nothing();
                        _this.fireChange();
                    }
                    else {
                        var m = parseDate(value, _this.values.input.format);
                        if (m.isValid()) {
                            _this.values.input.moment = maybe_1.just(m);
                            _this.fireChange();
                        }
                    }
                }, exports.DELAY),
                onblur: function () {
                    _this.view.invalidate();
                }
            }
        };
        return _this;
    }
    /**
     * @private
     */
    DateField.prototype.fireChange = function () {
        if (this.attrs.ww && this.attrs.ww.onChange) {
            var name_1 = this.attrs.ww.name || '';
            if (this.values.input.moment.isJust()) {
                var m = this.values.input.moment.get();
                if (m.isValid())
                    this.attrs.ww.onChange(new DateChangedEvent(name_1, m.format(exports.VALUE_FORMAT)));
            }
            else {
                this.attrs.ww.onChange(new DateChangedEvent(name_1, undefined));
            }
        }
    };
    DateField.prototype.setMessage = function (msg) {
        this.values.messages.text = msg;
        form_1.setMessage(this.view, this.values.messages.wml.id, msg);
        return this;
    };
    DateField.prototype.removeMessage = function () {
        this.values.messages.text = '';
        form_1.removeMessage(this.view, this.values.messages.wml.id);
        return this;
    };
    return DateField;
}(form_1.AbstractFormControl));
exports.DateField = DateField;
var parseDate = function (d, formats) {
    var str = d.toLowerCase();
    if ((str === exports.TODAY) || (str === exports.NOW)) {
        return moment.utc();
    }
    else if (str === exports.YESTERDAY) {
        return moment.utc().subtract(1, 'd');
    }
    else {
        return moment.utc(d, __spreadArrays(formats, [moment.ISO_8601]), true);
    }
};
var getValue = function (attrs) {
    return (attrs.ww && attrs.ww.value) ? attrs.ww.value : '';
};
var getFormat = function (attrs) {
    if (attrs.ww && attrs.ww.format) {
        switch (attrs.ww.format) {
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
var getPlaceholder = function (attrs) {
    if (attrs.ww && attrs.ww.placeholder)
        return attrs.ww.placeholder;
    if (attrs.ww && attrs.ww.format) {
        switch (attrs.ww.format) {
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
var getDisplay = function (attrs) {
    return (attrs.ww && attrs.ww.display) ? attrs.ww.display : exports.DEFAULT_INPUT_DISPLAY;
};
//# sourceMappingURL=index.js.map