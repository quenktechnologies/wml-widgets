"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/date");
var moment = require("moment");
var util_1 = require("../../util");
var feedback_1 = require("../feedback");
var __1 = require("../../");
var __2 = require("../");
var _prefix = function (s, inc) {
    if (inc === void 0) { inc = false; }
    var n = Number(s);
    if (inc)
        n = n + 1;
    if (isNaN(n))
        return '';
    return (n < 10) ? "0" + n : "" + n;
};
var _months = function () {
    return exports.MONTHS.map(function (label, value) { return ({ label: label, value: _prefix(value + 1) }); });
};
///classNames:begin
/**
 * DATE class name.
 */
exports.DATE = 'ww-date';
/**
 * DATE_DAY class name.
 */
exports.DATE_DAY = exports.DATE + "__day";
/**
 * DATE_MONTH class name.
 */
exports.DATE_MONTH = exports.DATE + "__month";
/**
 * DATE_YEAR class name.
 */
exports.DATE_YEAR = exports.DATE + "__year";
/**
 * DateChangedEvent is generated when the date has
 * been changed to a valid date.
 */
var DateChangedEvent = /** @class */ (function (_super) {
    __extends(DateChangedEvent, _super);
    function DateChangedEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DateChangedEvent;
}(__2.Event));
exports.DateChangedEvent = DateChangedEvent;
exports.format = {
    YYYYDDMM: 'YYYY-MM-DD',
    DD: 'DD',
    MM: 'MM',
    YYYY: 'YYYY'
};
exports.MONTHS = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
];
/**
 * Date input.
 */
var Date = /** @class */ (function (_super) {
    __extends(Date, _super);
    function Date() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.get = function () { return _this.calculate().format(_this.values.date.format); };
        _this.set = function (_) { return _this; };
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.DATE, 'form-group', __1.getClassName(_this.attrs), feedback_1.getVSClassNameFromAttrs(_this.attrs)),
            },
            control: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs)
            },
            inline: {
                className: 'form-inline'
            },
            date: {
                months: _months(),
                value: (_this.attrs.ww && _this.attrs.ww.value) ?
                    moment(_this.attrs.ww.value, exports.format.YYYYDDMM) : null,
                sep: '-',
                format: exports.format.YYYYDDMM,
                fire: function () {
                    if (_this.attrs.ww && _this.attrs.ww.onChange)
                        if (_this.values.date.value && _this.values.date.value.isValid())
                            _this.attrs.ww.onChange(new DateChangedEvent(_this.values.name, _this.values.date.value.format(_this.values.date.format)));
                }
            },
            month: {
                wml: {
                    id: 'month'
                },
                className: exports.DATE_MONTH,
                value: function () { return (_this.values.date.value && _this.values.date.value.isValid()) ?
                    _this.values.date.value.format(exports.format.MM) : ''; },
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled === true) ?
                    true : null,
                onchange: function (e) {
                    util_1.getById(_this.view, _this.values.day.wml.id)
                        .map(function (e) { e.focus(); })
                        .map(function () {
                        _this.values.month.value =
                            function () { return e.target.value; };
                        _this.values.date.value = _this.calculate();
                        _this.values.date.fire();
                    });
                }
            },
            day: {
                wml: {
                    id: 'day'
                },
                className: exports.DATE_DAY,
                value: function () { return (_this.values.date.value && _this.values.date.value.isValid()) ?
                    _this.values.date.value.format(exports.format.DD) : ''; },
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled === true) ? true : null,
                oninput: function (e) {
                    e.target.oninput = null;
                    _this.values.day.onkeyup(e);
                },
                onkeyup: function (e) {
                    var value = e.target.value;
                    _this.values.day.value =
                        function () { return _prefix(value); };
                    _this.values.date.value = _this.calculate();
                    _this.values.date.fire();
                    if (value.length === 2)
                        util_1.getById(_this.view, _this.values.year.wml.id)
                            .map(function (e) { return e.focus(); });
                }
            },
            year: {
                wml: {
                    id: 'year'
                },
                className: exports.DATE_YEAR,
                value: function () { return (_this.values.date.value && _this.values.date.value.isValid()) ?
                    _this.values.date.value.format(exports.format.YYYY) : ''; },
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled === true) ? true : null,
                oninput: function (e) {
                    e.target.oninput = null;
                    _this.values.year.onkeyup(e);
                },
                onkeyup: function (e) {
                    _this.values.year.value = function () { return e.target.value; };
                    _this.values.date.value = _this.calculate();
                    _this.values.date.fire();
                }
            },
            name: (_this.attrs.ww && _this.attrs.ww.name) || '<name>',
            messages: {
                wml: {
                    id: 'messages'
                },
            },
            label: {
                id: (_this.attrs.ww && _this.attrs.ww.name) || '<name>',
                text: (_this.attrs.ww && _this.attrs.ww.label) || '<label>'
            }
        };
        return _this;
    }
    /**
     * calculate the date based on the current value of the inputs.
     */
    Date.prototype.calculate = function () {
        var date = [
            this.values.year.value(),
            this.values.month.value(),
            this.values.day.value()
        ].filter(function (d) { return d; });
        return (date.length != 3) ?
            null :
            moment(date.join(this.values.date.sep), moment.ISO_8601);
    };
    ;
    return Date;
}(feedback_1.AbstractFeedbackControl));
exports.Date = Date;
//# sourceMappingURL=index.js.map