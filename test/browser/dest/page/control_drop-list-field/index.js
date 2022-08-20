"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropListFieldPage = void 0;
const views = require("./wml/drop-list-field");
const results_1 = require("../../fixtures/data/results");
const options = results_1.results;
class DropListFieldPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            normal: {
                id: 'normal',
                name: 'normal',
                label: 'Normal',
                options,
                value: results_1.results[2].value,
                onChange: doChange(this)
            },
            success: {
                id: 'success',
                name: 'success',
                label: 'Success',
                options,
                message: 'This has a success message.',
                onChange: doChange(this)
            },
            warning: {
                id: 'warning',
                name: 'warning',
                label: 'Warning',
                options,
                message: 'This has a warning message.',
                onChange: doChange(this)
            },
            error: {
                id: 'error',
                name: 'error',
                label: 'Error',
                options,
                message: 'This has a error message.',
                onChange: doChange(this)
            },
        };
    }
}
exports.DropListFieldPage = DropListFieldPage;
const doChange = (page) => ({ name, value }) => page
    .view
    .findById(name)
    .map(() => {
    alert(`Selected: ${name}=${value}`);
});
exports.default = new DropListFieldPage();
//# sourceMappingURL=index.js.map