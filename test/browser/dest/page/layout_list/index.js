"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("./wml/list");
var ListLayoutPage = /** @class */ (function () {
    function ListLayoutPage() {
        this.view = new list_1.Main(this);
        this.items = {
            'This is the first item.': false,
            'This is the second item.': true,
            'This is the third item.': false
        };
    }
    return ListLayoutPage;
}());
exports.ListLayoutPage = ListLayoutPage;
exports.default = new ListLayoutPage();
//# sourceMappingURL=index.js.map