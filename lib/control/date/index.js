"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Date_1 = require("./Date");
exports.Date = Date_1.Date;
var DateChangedEvent_1 = require("./DateChangedEvent");
exports.DateChangedEvent = DateChangedEvent_1.DateChangedEvent;
;
exports.format = {
    YYYYDDMM: 'YYYY-MM-DD',
    DD: 'DD',
    MM: 'MM',
    YYYY: 'YYYY'
};
exports.MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
exports.inputValues = function (id, klass, value, date, cb) { return ({
    id: id,
    class: klass,
    value: value,
    disabled: (date.attrs.ww.disabled === true) ? true : null,
    readOnly: (date.attrs.ww.readOnly === true) ? true : null,
    onInput: function (_a) {
        var value = _a.value;
        cb(value);
        date.date.value = date.calculate();
        date.fireChange();
    }
}); };
exports.prefix = function (s, inc) {
    if (inc === void 0) { inc = false; }
    var n = Number(s);
    if (inc)
        n = n + 1;
    if (isNaN(n))
        return '';
    return (n < 10) ? "0" + n : "" + n;
};
//# sourceMappingURL=index.js.map