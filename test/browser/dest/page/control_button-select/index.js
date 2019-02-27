"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/button-select");
var ButtonSelectPage = /** @class */ (function () {
    function ButtonSelectPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.values = {
            options: [
                { text: 'Asus', value: 'Asus' },
                { text: 'MSI', value: 'MSI' },
                { text: 'Gigabyte', value: 'Gigabyte' }
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
        this.onChangeMulti = function (_a) {
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
    return ButtonSelectPage;
}());
exports.ButtonSelectPage = ButtonSelectPage;
exports.default = new ButtonSelectPage();
//# sourceMappingURL=index.js.map