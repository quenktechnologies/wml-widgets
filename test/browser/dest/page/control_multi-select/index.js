"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/multi-select");
var results_1 = require("../../fixtures/data/results");
var MultiSelectPage = /** @class */ (function () {
    function MultiSelectPage() {
        this.view = new views.Main(this);
        this.values = {
            normal: {
                id: 'normal',
                name: 'normal',
                label: 'Normal',
                value: results_1.results[2],
                stringifier: function (r) { return r.value; },
                onSearch: onSearch(this),
                onChange: onChange(this),
            },
            success: {
                id: 'success',
                name: 'success',
                label: 'Success',
                stringifier: function (r) { return r.value; },
                message: 'This has a success message.',
                onSearch: onSearch(this),
                onChange: onChange(this),
            },
            warning: {
                id: 'warning',
                name: 'warning',
                label: 'Warning',
                stringifier: function (r) { return r.value; },
                message: 'This has a warning message.',
                onSearch: onSearch(this),
                onChange: onChange(this),
            },
            error: {
                id: 'error',
                name: 'error',
                label: 'Error',
                stringifier: function (r) { return r.value; },
                message: 'This has a error message.',
                onSearch: onSearch(this),
                onChange: onChange(this),
            },
            block: {
                id: 'block',
                name: 'block',
                label: 'Block',
                stringifier: function (r) { return r.value; },
                onSearch: onSearch(this),
                onChange: onChange(this),
            },
        };
    }
    return MultiSelectPage;
}());
exports.MultiSelectPage = MultiSelectPage;
var onSearch = function (page) { return function (_a) {
    var name = _a.name, value = _a.value;
    return page
        .view
        .findById(name)
        .map(function (s) {
        var hit = results_1.results.filter(function (c) {
            return c.value.toLowerCase().startsWith(value) ? true : false;
        });
        s.update(hit);
    });
}; };
var onChange = function (page) { return function (_a) {
    var name = _a.name, value = _a.value;
    return page
        .view
        .findById(name)
        .map(function (t) {
        t.setMessage("Count: " + value.length);
    });
}; };
exports.default = new MultiSelectPage();
//# sourceMappingURL=index.js.map