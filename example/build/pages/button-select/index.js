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
var views = require("./wml/button-select");
var Page_1 = require("../Page");
var ButtonSelectPage = /** @class */ (function (_super) {
    __extends(ButtonSelectPage, _super);
    function ButtonSelectPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            options: [
                { title: 'Asus', value: 'Asus' },
                { title: 'MSI', value: 'MSI' },
                { title: 'Gigabyte', value: 'Gigabyte' }
            ]
        };
        _this.onChange = function (_a) {
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
        _this.onChangeMulti = function (_a) {
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
        return _this;
    }
    return ButtonSelectPage;
}(Page_1.Page));
exports.ButtonSelectPage = ButtonSelectPage;
//# sourceMappingURL=index.js.map