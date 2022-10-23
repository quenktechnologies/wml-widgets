"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onChange = exports.DateFieldPage = void 0;
const views = require("./wml/date-field");
const util_1 = require("../../../../../lib/util");
class DateFieldPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            data: {
                id: 'iso',
                name: 'iso',
                label: 'ISO8601',
                message: 'ISO8601 date',
                onChange: (0, exports.onChange)(this)
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
                    onChange: (0, exports.onChange)(this)
                },
                warning: {
                    id: 'warning',
                    name: 'warning',
                    label: 'Warning',
                    success: undefined,
                    warning: 'Warning date',
                    error: undefined,
                    block: false,
                    onChange: (0, exports.onChange)(this)
                },
                error: {
                    id: 'error',
                    name: 'error',
                    label: 'Error',
                    success: undefined,
                    warning: undefined,
                    error: 'Error date',
                    block: false,
                    onChange: (0, exports.onChange)(this)
                }
            },
            block: {
                id: 'block',
                name: 'block',
                label: 'Block',
                success: undefined,
                warning: undefined,
                error: undefined,
                onChange: (0, exports.onChange)(this)
            },
            tests: {
                id: 'test',
                label: 'Tests',
                data: [
                    '2022-10-22',
                    '2022-10-2',
                    '2022-1-02',
                    '2022-1-1',
                    '22-01-1',
                    '22-02-1',
                    '22-1-20',
                    '22-7-7',
                    '20220707',
                    '2022077',
                    '220707',
                    '2277'
                ].map(value => ({ label: value, value })),
                value: '',
                onSelect: (e) => {
                    this.values.tests.value = e.value;
                    this.view.invalidate();
                },
                onChange: (0, exports.onChange)(this)
            }
        };
    }
}
exports.DateFieldPage = DateFieldPage;
const onChange = (d) => ({ name, value }) => {
    let mDate = (0, util_1.getById)(d.view, name);
    if (mDate.isJust()) {
        let d = mDate.get();
        d.setMessage(`The date is "${value}".`);
    }
};
exports.onChange = onChange;
exports.default = new DateFieldPage();
//# sourceMappingURL=index.js.map