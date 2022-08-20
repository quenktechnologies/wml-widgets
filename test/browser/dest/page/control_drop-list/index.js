"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropListPage = void 0;
const views = require("./wml/drop-list");
const results_1 = require("../../fixtures/data/results");
const options = results_1.results;
class DropListPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            normal: {
                id: 'normal',
                name: 'normal',
                label: 'Normal',
                options,
                value: results_1.results[2].value,
                onSelect: doSelect(this)
            },
            block: {
                id: 'block',
                name: 'block',
                label: 'Block',
                options,
                onSelect: doSelect(this)
            },
            success: {
                id: 'success',
                name: 'success',
                label: 'Success',
                options,
                message: 'This has a success message.',
                onSelect: doSelect(this)
            },
            warning: {
                id: 'warning',
                name: 'warning',
                label: 'Warning',
                options,
                message: 'This has a warning message.',
                onSelect: doSelect(this)
            },
            error: {
                id: 'error',
                name: 'error',
                label: 'Error',
                options,
                message: 'This has a error message.',
                onSelect: doSelect(this)
            },
        };
    }
}
exports.DropListPage = DropListPage;
const doSelect = (page) => ({ name, value }) => page
    .view
    .findById(name)
    .map(() => {
    alert(`Selected: ${name}=${value}`);
});
exports.default = new DropListPage();
//# sourceMappingURL=index.js.map