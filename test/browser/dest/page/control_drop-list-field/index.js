"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/drop-list-field");
var results_1 = require("../../fixtures/data/results");
var options = results_1.results;
var DropListFieldPage = /** @class */ (function () {
    function DropListFieldPage() {
        this.view = new views.Main(this);
        this.values = {
            normal: {
                id: 'normal',
                name: 'normal',
                label: 'Normal',
                options: options,
                value: results_1.results[2].value,
                onChange: doChange(this)
            },
            success: {
                id: 'success',
                name: 'success',
                label: 'Success',
                options: options,
                message: 'This has a success message.',
                onChange: doChange(this)
            },
            warning: {
                id: 'warning',
                name: 'warning',
                label: 'Warning',
                options: options,
                message: 'This has a warning message.',
                onChange: doChange(this)
            },
            error: {
                id: 'error',
                name: 'error',
                label: 'Error',
                options: options,
                message: 'This has a error message.',
                onChange: doChange(this)
            },
        };
    }
    return DropListFieldPage;
}());
exports.DropListFieldPage = DropListFieldPage;
var doChange = function (page) { return function (_a) {
    var name = _a.name, value = _a.value;
    return page
        .view
        .findById(name)
        .map(function () {
        alert("Selected: " + name + "=" + value);
    });
}; };
exports.default = new DropListFieldPage();
//# sourceMappingURL=index.js.map