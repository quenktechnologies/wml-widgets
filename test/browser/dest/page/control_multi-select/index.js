"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSelectPage = void 0;
const views = require("./wml/multi-select");
const results_1 = require("../../fixtures/data/results");
class MultiSelectPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            normal: {
                id: 'normal',
                name: 'normal',
                label: 'Normal',
                stringifier: (r) => r.value,
                onSearch: onSearch(this),
                onChange: onChange(this),
            },
            success: {
                id: 'success',
                name: 'success',
                label: 'Success',
                stringifier: (r) => r.value,
                message: 'This has a success message.',
                onSearch: onSearch(this),
                onChange: onChange(this),
            },
            warning: {
                id: 'warning',
                name: 'warning',
                label: 'Warning',
                stringifier: (r) => r.value,
                message: 'This has a warning message.',
                onSearch: onSearch(this),
                onChange: onChange(this),
            },
            error: {
                id: 'error',
                name: 'error',
                label: 'Error',
                stringifier: (r) => r.value,
                message: 'This has a error message.',
                onSearch: onSearch(this),
                onChange: onChange(this),
            },
            block: {
                id: 'block',
                name: 'block',
                label: 'Block',
                stringifier: (r) => r.value,
                onSearch: onSearch(this),
                onChange: onChange(this),
            },
            init: {
                id: 'init',
                name: 'init',
                label: 'Init',
                value: results_1.results,
                stringifier: (r) => r.value,
                onSearch: onSearch(this),
                onChange: onChange(this),
            }
        };
    }
}
exports.MultiSelectPage = MultiSelectPage;
const onSearch = (page) => ({ name, value }) => page
    .view
    .findById(name)
    .map((s) => {
    let hit = results_1.results.filter(c => c.value.toLowerCase().startsWith(value) ? true : false);
    s.update(hit);
});
const onChange = (page) => ({ name, value }) => page
    .view
    .findById(name)
    .map(t => {
    t.setMessage(`Count: ${value.length}`);
});
exports.default = new MultiSelectPage();
//# sourceMappingURL=index.js.map