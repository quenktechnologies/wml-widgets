"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/multi-select");
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
var MultiSelectPage = /** @class */ (function () {
    function MultiSelectPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.values = {
            id: 'search',
            name: 'search',
            text: function () { return _this.values.selected.map(function (m) { return m.label; }).join(','); },
            selected: [],
            options: options
        };
        this.onSearch = function (_a) {
            var value = _a.value;
            _this
                .view
                .findById(_this.values.id)
                .map(function (s) {
                return s.update(options.filter(function (s) { return s.value.toLowerCase().startsWith(value.toLowerCase()); }));
            });
        };
        this.onChange = function (_a) {
            var value = _a.value;
            _this.values.selected = value;
            _this.view.invalidate();
        };
    }
    return MultiSelectPage;
}());
exports.MultiSelectPage = MultiSelectPage;
exports.default = new MultiSelectPage();
//# sourceMappingURL=index.js.map