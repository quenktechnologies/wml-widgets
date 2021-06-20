"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectPage = void 0;
var views = require("./wml/select");
var results_1 = require("../../fixtures/data/results");
var SelectPage = /** @class */ (function () {
    function SelectPage() {
        this.view = new views.Main(this);
        this.values = {
            normal: {
                id: 'normal',
                name: 'normal',
                label: 'Normal',
                value: results_1.results[2],
                stringifier: function (r) { return r.value; },
                onSearch: doSearch(this),
                onChange: doChange(this),
                onUnset: doUnset(this)
            },
            block: {
                id: 'block',
                name: 'block',
                label: 'Block',
                stringifier: function (r) { return r.value; },
                onSearch: doSearch(this),
                onChange: doChange(this),
                onUnset: doUnset(this)
            },
            success: {
                id: 'success',
                name: 'success',
                label: 'Success',
                stringifier: function (r) { return r.value; },
                message: 'This has a success message.',
                onSearch: doSearch(this),
                onChange: doChange(this),
                onUnset: doUnset(this)
            },
            warning: {
                id: 'warning',
                name: 'warning',
                label: 'Warning',
                stringifier: function (r) { return r.value; },
                message: 'This has a warning message.',
                onSearch: doSearch(this),
                onChange: doChange(this),
                onUnset: doUnset(this)
            },
            error: {
                id: 'error',
                name: 'error',
                label: 'Error',
                stringifier: function (r) { return r.value; },
                message: 'This has a error message.',
                onSearch: doSearch(this),
                onChange: doChange(this),
                onUnset: doUnset(this)
            },
        };
    }
    return SelectPage;
}());
exports.SelectPage = SelectPage;
var doSearch = function (page) { return function (_a) {
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
var doChange = function (page) { return function (_a) {
    var name = _a.name, value = _a.value;
    return page
        .view
        .findById(name)
        .map(function (t) {
        t.setMessage("Selected: " + value.value);
    });
}; };
var doUnset = function (page) { return function (_a) {
    var name = _a.name;
    return page
        .view
        .findById(name)
        .map(function (t) {
        t.setMessage('');
    });
}; };
exports.default = new SelectPage();
//# sourceMappingURL=index.js.map