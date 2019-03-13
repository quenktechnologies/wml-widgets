"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/droplist");
var size_1 = require("../../../../../lib/content/size");
var DroplistPage = /** @class */ (function () {
    function DroplistPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.values = {
            options: [
                { title: 'Asus', value: 'Asus' },
                { title: 'MSI', value: 'MSI' },
                { title: 'Gigabyte', value: 'Gigabyte' }
            ],
            sizes: [
                size_1.Size.ExtraSmall,
                size_1.Size.Small,
                size_1.Size.Medium,
                size_1.Size.Large,
                size_1.Size.ExtraLarge
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
    return DroplistPage;
}());
exports.DroplistPage = DroplistPage;
exports.default = new DroplistPage();
//# sourceMappingURL=index.js.map