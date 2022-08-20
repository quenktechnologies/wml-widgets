"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onChange = exports.DateFieldPage = void 0;
const views = require("./wml/date-field");
const date_field_1 = require("../../../../../lib/control/date-field");
const util_1 = require("../../../../../lib/util");
class DateFieldPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            formats: {
                iso: {
                    id: 'iso',
                    name: 'iso',
                    label: 'ISO8601',
                    format: date_field_1.Format.ISO8601,
                    message: 'ISO8601 date',
                    onChange: exports.onChange(this)
                },
                common: {
                    id: 'common',
                    name: 'common',
                    label: 'Comon',
                    format: date_field_1.Format.COMMON,
                    message: 'Common date',
                    onChange: exports.onChange(this)
                },
                us: {
                    id: 'us',
                    name: 'us',
                    label: 'US',
                    format: date_field_1.Format.USA,
                    message: 'US date',
                    onChange: exports.onChange(this)
                }
            },
            states: {
                success: {
                    id: 'success',
                    name: 'success',
                    label: 'Success',
                    success: 'Success date',
                    warning: undefined,
                    error: undefined,
                    block: false,
                    onChange: exports.onChange(this)
                },
                warning: {
                    id: 'warning',
                    name: 'warning',
                    label: 'Warning',
                    success: undefined,
                    warning: 'Warning date',
                    error: undefined,
                    block: false,
                    onChange: exports.onChange(this)
                },
                error: {
                    id: 'error',
                    name: 'error',
                    label: 'Error',
                    success: undefined,
                    warning: undefined,
                    error: 'Error date',
                    block: false,
                    onChange: exports.onChange(this)
                },
                block: {
                    id: 'block',
                    name: 'block',
                    label: 'Block',
                    success: undefined,
                    warning: undefined,
                    error: undefined,
                    block: true,
                    onChange: exports.onChange(this)
                },
            }
        };
    }
}
exports.DateFieldPage = DateFieldPage;
exports.onChange = (d) => ({ name, value }) => {
    let mDate = util_1.getById(d.view, name);
    if (mDate.isJust()) {
        let d = mDate.get();
        d.setMessage(`The date is ${value}.`);
    }
};
exports.default = new DateFieldPage();
//# sourceMappingURL=index.js.map