"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/typeahead");
var results = [
    { label: 'Asus', value: 'Asus' },
    { label: 'MSI', value: 'MSI' },
    { label: 'Gigabyte', value: 'Gigabyte' },
    { label: 'Gigas', value: 'Gigas' },
    { label: 'AsusTek', value: 'AsusTek' },
    { label: 'Asusuga', value: 'Asusuga' },
    { label: 'Qualcomm', value: 'Qualcomm' },
    { label: 'Qualitative', value: 'Qualitatve' },
    { label: 'Kirpalani\'s', value: 'Kirpalani\'s' },
    { label: 'Asunder', value: 'Asunder' }
];
var TypeaheadPage = /** @class */ (function () {
    function TypeaheadPage() {
        this.view = new views.Main(this);
        this.values = {
            normal: {
                id: 'normal',
                name: 'normal',
                label: 'Normal',
                value: 'Normal',
                stringifier: function (r) { return r.value; },
                onSearch: doSearch(this),
                onChange: doChange(this)
            },
            block: {
                id: 'block',
                name: 'block',
                label: 'Block',
                stringifier: function (r) { return r.value; },
                onSearch: doSearch(this),
                onChange: doChange(this)
            },
            success: {
                id: 'success',
                name: 'success',
                label: 'Success',
                stringifier: function (r) { return r.value; },
                message: 'This has a success message.',
                onSearch: doSearch(this),
                onChange: doChange(this)
            },
            warning: {
                id: 'warning',
                name: 'warning',
                label: 'Warning',
                stringifier: function (r) { return r.value; },
                message: 'This has a warning message.',
                onSearch: doSearch(this),
                onChange: doChange(this)
            },
            error: {
                id: 'error',
                name: 'error',
                label: 'Error',
                stringifier: function (r) { return r.value; },
                message: 'This has a error message.',
                onSearch: doSearch(this),
                onChange: doChange(this)
            },
        };
    }
    return TypeaheadPage;
}());
exports.TypeaheadPage = TypeaheadPage;
var doSearch = function (page) { return function (_a) {
    var name = _a.name, value = _a.value;
    return page
        .view
        .findById(name)
        .map(function (s) {
        var hit = results.filter(function (c) {
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
        t.setMessage("Selected: " + value);
    });
}; };
exports.default = new TypeaheadPage();
//# sourceMappingURL=index.js.map