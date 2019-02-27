"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/select");
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
var onSearch = function (page) { return function (id) { return function (_a) {
    var value = _a.value;
    return page
        .view
        .findById(id)
        .map(function (s) {
        var hit = results.filter(function (c) {
            return c.value.toLowerCase().startsWith(value) ? true : false;
        });
        s.update(hit);
    });
}; }; };
var onChange = function (page) { return function (_a) {
    var name = _a.name, value = _a.value;
    return page.view.findById(name)
        .map(function (e) {
        while (e.lastChild)
            e.removeChild(e.lastChild);
        e.appendChild(document.createTextNode(value.value));
    });
}; };
var SelectPage = /** @class */ (function () {
    function SelectPage() {
        this.view = new views.Main(this);
        this.values = {
            autocomplete: {
                id: 'autocomplete',
                name: 'autocompleteName',
                onSearch: onSearch(this)('autocomplete'),
                onChange: onChange(this)
            },
            native: {
                id: 'native',
                name: 'nativeName',
                options: results,
                onSearch: onSearch(this)('native'),
                onChange: onChange(this)
            }
        };
    }
    return SelectPage;
}());
exports.SelectPage = SelectPage;
exports.default = new SelectPage();
//# sourceMappingURL=index.js.map