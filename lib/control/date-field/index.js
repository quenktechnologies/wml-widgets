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
var views = require("./wml/date-field");
var moment = require("moment");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var util_1 = require("../../util");
var feedback_1 = require("../feedback");
var __1 = require("../../");
var __2 = require("../");
///classNames:begin
exports.DATE_FIELD = 'ww-date-field';
exports.DATE_FIELD_CONTROLS = 'ww-date-field__controls';
exports.DATE_FIELD_DAY = exports.DATE_FIELD + "__day";
exports.DATE_FIELD_MONTH = exports.DATE_FIELD + "__month";
exports.DATE_FIELD_YEAR = exports.DATE_FIELD + "__year";
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
/**
 * DateField
 */
var DateField = /** @class */ (function (_super) {
    __extends(DateField, _super);
    function DateField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.DATE_FIELD, __1.getClassName(_this.attrs), feedback_1.getValidityClassName(_this.attrs)),
            },
            control: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(_this.attrs)
            },
            controls: {
                className: exports.DATE_FIELD_CONTROLS
            },
            day: {
                wml: {
                    id: 'day'
                },
                className: exports.DATE_FIELD_DAY,
                value: getDay(_this.attrs),
                disabled: (_this.attrs.ww &&
                    _this.attrs.ww.disabled === true) ?
                    true : null,
                oninput: function (e) {
                    e.target.oninput = null;
                    _this.values.day.onkeyup(e);
                },
                onkeyup: function (e) {
                    var value = e.target.value;
                    _this.values.day.value = value;
                    _this.update();
                }
            },
            month: {
                wml: {
                    id: 'month'
                },
                className: exports.DATE_FIELD_MONTH,
                value: getMonth(_this.attrs),
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled === true) ?
                    true : null,
                oninput: function (e) {
                    e.target.oninput = null;
                    _this.values.year.onkeyup(e);
                },
                onkeyup: function (e) {
                    _this.values.month.value = e.target.value;
                    _this.update();
                }
            },
            year: {
                wml: {
                    id: 'year'
                },
                className: exports.DATE_FIELD_YEAR,
                value: getYear(_this.attrs),
                disabled: (_this.attrs.ww && _this.attrs.ww.disabled === true) ?
                    true : null,
                oninput: function (e) {
                    e.target.oninput = null;
                    _this.values.year.onkeyup(e);
                },
                onkeyup: function (e) {
                    _this.values.year.value = e.target.value;
                    _this.update();
                }
            },
            name: (_this.attrs.ww && _this.attrs.ww.name) || '<name>',
            messages: {
                wml: {
                    id: 'messages'
                },
                text: feedback_1.getMessage(_this.attrs)
            },
            label: {
                id: (_this.attrs.ww && _this.attrs.ww.name) || '',
                text: (_this.attrs.ww && _this.attrs.ww.label) || ''
            }
        };
        return _this;
    }
    /**
     * @private
     */
    DateField.prototype.update = function () {
        var mayM = getCurrentValue(this);
        if (mayM.isJust()) {
            var m = mayM.get();
            if (!m.isValid()) {
                this.setValidationState(feedback_1.ValidationState.Error);
            }
            else {
                this.removeValidationState();
            }
            this.fire(m);
        }
    };
    /**
     * @private
     */
    DateField.prototype.fire = function (value) {
        if (this.attrs.ww && this.attrs.ww.onChange)
            this.attrs.ww.onChange(new DateChangedEvent(this.values.name, value.format('YYYY-MM-DD')));
    };
    return DateField;
}(feedback_1.AbstractFeedbackControl));
exports.DateField = DateField;
var getDate = function (attrs) {
    if (attrs.ww && attrs.ww.value) {
        var m = moment(attrs.ww.value, moment.ISO_8601);
        if (m.isValid())
            return maybe_1.just(m);
    }
    return maybe_1.nothing();
};
var getDay = function (attrs) {
    var mayDate = getDate(attrs);
    if (mayDate.isNothing())
        return '';
    return '' + mayDate.get().date();
};
var getMonth = function (attrs) {
    var mayDate = getDate(attrs);
    if (mayDate.isNothing())
        return '';
    return '' + (mayDate.get().month() + 1);
};
var getYear = function (attrs) {
    var mayDate = getDate(attrs);
    if (mayDate.isNothing())
        return '';
    return '' + mayDate.get().year();
};
var getCurrentValue = function (self) {
    var mDay = util_1.getById(self.view, self.values.day.wml.id);
    if (mDay.isNothing())
        return maybe_1.nothing();
    var mMonth = util_1.getById(self.view, self.values.month.wml.id);
    if (mMonth.isNothing())
        return maybe_1.nothing();
    var mYear = util_1.getById(self.view, self.values.year.wml.id);
    if (mYear.isNothing())
        return maybe_1.nothing();
    var year = mYear.get().value;
    var month = mMonth.get().value;
    var day = mDay.get().value;
    if ((year.length < 4) || (month.length < 2) || (day.length < 2))
        return maybe_1.nothing();
    return maybe_1.just(moment(year + "-" + month + "-" + day, moment.ISO_8601));
};
//# sourceMappingURL=index.js.map