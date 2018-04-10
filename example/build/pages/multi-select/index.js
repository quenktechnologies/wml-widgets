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
var views = require("./wml/multi-select");
var Page_1 = require("../Page");
var options = [
    { label: 'Asus', value: 'Asus' },
    { label: 'MSI', value: 'MSI' },
    { label: 'Gigabyte', value: 'Gigabyte' },
    { label: 'Gigas', value: 'Gigas' },
    { label: 'AsusTek', value: 'AsusTek' },
    { label: 'Asusuga', value: 'Asusuga' },
    { label: 'Qualcomm', value: 'Qualcomm' },
    { label: 'Qualitative', value: 'Qualitatve' },
    { label: 'Asunder', value: 'Asunder' }
];
var MultiSelectPage = /** @class */ (function (_super) {
    __extends(MultiSelectPage, _super);
    function MultiSelectPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            id: 'search',
            name: 'search',
            text: function () { return _this.values.selected.map(function (m) { return m.label; }).join(','); },
            selected: [],
            options: options
        };
        _this.onSearch = function (_a) {
            var value = _a.value;
            _this.view.findById(_this.values.id).map(function (s) {
                return s.update(options.filter(function (s) { return s.value.toLowerCase().startsWith(value.toLowerCase()); }));
            });
        };
        _this.onChange = function (_a) {
            var value = _a.value;
            _this.values.selected = value;
            _this.view.invalidate();
        };
        return _this;
    }
    return MultiSelectPage;
}(Page_1.Page));
exports.MultiSelectPage = MultiSelectPage;
//# sourceMappingURL=index.js.map