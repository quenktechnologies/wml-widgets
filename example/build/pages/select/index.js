"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/select");
var Page_1 = require("../Page");
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
var onSelect = function (page) { return function (_a) {
    var name = _a.name, value = _a.value;
    return page.view.findById(name)
        .map(function (e) {
        while (e.lastChild)
            e.removeChild(e.lastChild);
        e.appendChild(document.createTextNode(value.value));
    });
}; };
var SelectPage = /** @class */ (function (_super) {
    __extends(SelectPage, _super);
    function SelectPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            autocomplete: {
                id: 'autocomplete',
                name: 'autocompleteName',
                onSearch: onSearch(_this)('autocomplete'),
                onSelect: onSelect(_this)
            },
            native: {
                id: 'native',
                name: 'nativeName',
                options: results,
                onSearch: onSearch(_this)('native'),
                onSelect: onSelect(_this)
            }
        };
        return _this;
    }
    return SelectPage;
}(Page_1.Page));
exports.SelectPage = SelectPage;
//# sourceMappingURL=index.js.map