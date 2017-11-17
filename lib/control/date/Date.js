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
var names = require("@package/self/common/names");
var moment = require("moment");
var util_1 = require("@package/self/common/util");
var feedback_control_1 = require("@package/self/control/feedback-control");
var control_1 = require("@package/self/control");
var form_control_1 = require("@package/self/control/form-control");
var _1 = require(".");
var DateChangedEvent_1 = require("./DateChangedEvent");
/**
 * Date input.
 */
var Date = /** @class */ (function (_super) {
    __extends(Date, _super);
    function Date() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.delegate = _this.attrs.ww.delegate ?
            _this.attrs.ww.delegate : new control_1.DefaultDelegate(_this.attrs.ww);
        _this.date = {
            value: _this.attrs.ww.value ? moment(_this.attrs.ww.value, _1.format.YYYYDDMM) : null,
            sep: '-',
            format: _1.format.YYYYDDMM
        };
        _this.values = {
            root: {
                id: 'root',
                class: util_1.concat(names.DATE, 'form-group', _this.attrs.ww.class, feedback_control_1.state(_this.attrs.ww)),
            },
            inline: {
                class: 'form-inline'
            },
            date: {
                months: _1.MONTHS.map(function (label, value) { return ({ label: label, value: _1.prefix(value + 1) }); }),
                prefix: _1.prefix
            },
            delegate: _this.delegate,
            day: _1.inputValues('day', names.DATE_DAY, (_this.date.value && _this.date.value.isValid()) ?
                _this.date.value.format(_1.format.DD) : '', _this, function (v) { return _this.values.day.value = _1.prefix(v); }),
            month: _1.inputValues('month', names.DATE_MONTH, (_this.date.value && _this.date.value.isValid()) ?
                _this.date.value.format(_1.format.MM) : '', _this, function (v) { return _this.values.month.value = v; }),
            year: _1.inputValues('year', names.DATE_YEAR, (_this.date.value && _this.date.value.isValid()) ?
                _this.date.value.format(_1.format.YYYY) : '', _this, function (v) { return _this.values.year.value = v; }),
            name: _this.attrs.ww.name,
            help: {
                id: 'helps',
                success: _this.attrs.ww.success,
                error: _this.attrs.ww.error,
                warning: _this.attrs.ww.warning
            },
            label: {
                id: _this.attrs.ww.name,
                text: _this.attrs.ww.label || ''
            }
        };
        return _this;
    }
    Date.prototype.value = function () {
        return this.calculate().format(this.date.format);
    };
    /**
     * calculate the date based on the current value of the inputs.
     */
    Date.prototype.calculate = function () {
        var date = [
            this.values.year.value,
            this.values.month.value,
            this.values.day.value
        ].filter(function (d) { return d; });
        return (date.length != 3) ? null : moment(date.join(this.date.sep), moment.ISO_8601);
    };
    ;
    /**
     * fireChange
     * @private
     */
    Date.prototype.fireChange = function () {
        if (this.date.value && this.date.value.isValid())
            this.values.delegate.onChange(new DateChangedEvent_1.DateChangedEvent(this.values.name, this.date.value.format(this.date.format)));
    };
    return Date;
}(form_control_1.FormControlWidget));
exports.Date = Date;
//# sourceMappingURL=Date.js.map