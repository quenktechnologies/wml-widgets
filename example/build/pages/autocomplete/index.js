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
var views = require("./wml/autocomplete");
var Page_1 = require("../Page");
var AutocompletePage = /** @class */ (function (_super) {
    __extends(AutocompletePage, _super);
    function AutocompletePage() {
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
        _this.onSearch = function (_a) {
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
    return AutocompletePage;
}(Page_1.Page));
exports.AutocompletePage = AutocompletePage;
//# sourceMappingURL=index.js.map