"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/stack");
var _getValues = function () { return [
    { label: 'Asus', value: 'Asus' },
    { label: 'MSI', value: 'MSI' },
    { label: 'MSI', value: 'MSI' },
    { label: 'Gigabyte', value: 'Gigabyte' }
]; };
var _getText = function (m) {
    return document.createTextNode(m.map(function (_a) {
        var label = _a.label;
        return label;
    }).join(','));
};
var StackPage = /** @class */ (function () {
    function StackPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.values = {
            values: _getValues(),
            text: _getText(_getValues()),
            decorator: function (m) { return m.label; }
        };
        this.onChange = function (_a) {
            var value = _a.value;
            if (value.length === 0)
                _this.values.values = _getValues();
            _this.values.text = _getText(_this.values.values);
            _this.view.invalidate();
        };
    }
    return StackPage;
}());
exports.StackPage = StackPage;
exports.default = new StackPage();
//# sourceMappingURL=index.js.map