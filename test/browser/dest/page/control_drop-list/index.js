"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropListPage = void 0;
var views = require("./wml/drop-list");
var results_1 = require("../../fixtures/data/results");
var options = results_1.results;
var DropListPage = /** @class */ (function () {
    function DropListPage() {
        this.view = new views.Main(this);
        this.values = {
            normal: {
                id: 'normal',
                name: 'normal',
                label: 'Normal',
                options: options,
                value: results_1.results[2].value,
                onSelect: doSelect(this)
            },
            block: {
                id: 'block',
                name: 'block',
                label: 'Block',
                options: options,
                onSelect: doSelect(this)
            },
            success: {
                id: 'success',
                name: 'success',
                label: 'Success',
                options: options,
                message: 'This has a success message.',
                onSelect: doSelect(this)
            },
            warning: {
                id: 'warning',
                name: 'warning',
                label: 'Warning',
                options: options,
                message: 'This has a warning message.',
                onSelect: doSelect(this)
            },
            error: {
                id: 'error',
                name: 'error',
                label: 'Error',
                options: options,
                message: 'This has a error message.',
                onSelect: doSelect(this)
            },
        };
    }
    return DropListPage;
}());
exports.DropListPage = DropListPage;
var doSelect = function (page) { return function (_a) {
    var name = _a.name, value = _a.value;
    return page
        .view
        .findById(name)
        .map(function () {
        alert("Selected: " + name + "=" + value);
    });
}; };
exports.default = new DropListPage();
//# sourceMappingURL=index.js.map