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
var views = require("./wml/search");
var Page_1 = require("../Page");
var SearchPage = /** @class */ (function (_super) {
    __extends(SearchPage, _super);
    function SearchPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            id: 'search',
            name: 'search',
            results: [
                { label: 'Asus', value: 'Asus' },
                { label: 'MSI', value: 'MSI' },
                { label: 'Gigabyte', value: 'Gigabyte' },
                { label: 'Gigas', value: 'Gigas' },
                { label: 'AsusTek', value: 'AsusTek' },
                { label: 'Asusuga', value: 'Asusuga' },
                { label: 'Qualcomm', value: 'Qualcomm' },
                { label: 'Qualitative', value: 'Qualitatve' },
                { label: 'Asunder', value: 'Asunder' }
            ]
        };
        _this.onChange = function (_a) {
            var value = _a.value;
            _this
                .view
                .findById(_this.values.id)
                .map(function (s) {
                var hit = _this.values.results.filter(function (c) {
                    return c.value.toLowerCase().startsWith(value) ? true : false;
                });
                s.update(hit);
            });
        };
        _this.onSelect = function (_a) {
            var value = _a.value;
            _this.view.findById('selected')
                .map(function (e) {
                while (e.lastChild)
                    e.removeChild(e.lastChild);
                e.appendChild(document.createTextNode(value.value));
            });
        };
        return _this;
    }
    return SearchPage;
}(Page_1.Page));
exports.SearchPage = SearchPage;
//# sourceMappingURL=index.js.map