"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/native-select");
var NativeSelectPage = /** @class */ (function () {
    function NativeSelectPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.values = {
            options: [
                { title: 'Asus', value: 'Asus' },
                { title: 'MSI', value: 'MSI' },
                { title: 'Gigabyte', value: 'Gigabyte' }
            ]
        };
        this.onChange = function (_a) {
            var value = _a.value, name = _a.name;
            _this
                .view
                .findById(name + "-content")
                .map(function (e) {
                while (e.lastChild)
                    e.removeChild(e.lastChild);
                e.appendChild(document.createTextNode(String(value)));
            });
        };
    }
    return NativeSelectPage;
}());
exports.NativeSelectPage = NativeSelectPage;
exports.default = new NativeSelectPage();
//# sourceMappingURL=index.js.map