"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPage = void 0;
const views = require("./wml/select");
const results_1 = require("../../fixtures/data/results");
class SelectPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            normal: {
                id: 'normal',
                name: 'normal',
                label: 'Normal',
                value: results_1.results[2],
                stringifier: (r) => r.value,
                onSearch: doSearch(this),
                onChange: doChange(this),
                onUnset: doUnset(this)
            },
            block: {
                id: 'block',
                name: 'block',
                label: 'Block',
                stringifier: (r) => r.value,
                onSearch: doSearch(this),
                onChange: doChange(this),
                onUnset: doUnset(this)
            },
            success: {
                id: 'success',
                name: 'success',
                label: 'Success',
                stringifier: (r) => r.value,
                message: 'This has a success message.',
                onSearch: doSearch(this),
                onChange: doChange(this),
                onUnset: doUnset(this)
            },
            warning: {
                id: 'warning',
                name: 'warning',
                label: 'Warning',
                stringifier: (r) => r.value,
                message: 'This has a warning message.',
                onSearch: doSearch(this),
                onChange: doChange(this),
                onUnset: doUnset(this)
            },
            error: {
                id: 'error',
                name: 'error',
                label: 'Error',
                stringifier: (r) => r.value,
                message: 'This has a error message.',
                onSearch: doSearch(this),
                onChange: doChange(this),
                onUnset: doUnset(this)
            },
        };
    }
}
exports.SelectPage = SelectPage;
const doSearch = (page) => ({ name, value }) => page
    .view
    .findById(name)
    .map((s) => {
    let hit = results_1.results.filter(c => c.value.toLowerCase().startsWith(value) ? true : false);
    s.update(hit);
});
const doChange = (page) => ({ name, value }) => page
    .view
    .findById(name)
    .map(t => {
    t.setMessage(`Selected: ${value.value}`);
});
const doUnset = (page) => ({ name }) => page
    .view
    .findById(name)
    .map(t => {
    t.setMessage('');
});
exports.default = new SelectPage();
//# sourceMappingURL=index.js.map