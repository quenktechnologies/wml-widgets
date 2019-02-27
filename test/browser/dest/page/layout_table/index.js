"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var table_1 = require("./wml/table");
var TableLayoutPage = /** @class */ (function () {
    function TableLayoutPage() {
        this.view = new table_1.Main(this);
    }
    return TableLayoutPage;
}());
exports.TableLayoutPage = TableLayoutPage;
exports.default = new TableLayoutPage();
//# sourceMappingURL=index.js.map