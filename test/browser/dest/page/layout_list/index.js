"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListLayoutPage = void 0;
var list_1 = require("./wml/list");
var ListLayoutPage = /** @class */ (function () {
    function ListLayoutPage() {
        var _this = this;
        this.view = new list_1.Main(this);
        this.items = {
            'This is the first item.': false,
            'This is the second item.': true,
            'This is the third item.': false
        };
        this.click = function (key) {
            return _this
                .view
                .findById(key)
                .map(function (l) { return l.toggleActive(); })
                .orJust(function () { return alert("Cannot find element by id \"" + key + "\"!"); });
        };
    }
    return ListLayoutPage;
}());
exports.ListLayoutPage = ListLayoutPage;
exports.default = new ListLayoutPage();
//# sourceMappingURL=index.js.map