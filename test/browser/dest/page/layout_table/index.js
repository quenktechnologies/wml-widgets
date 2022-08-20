"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableLayoutPage = void 0;
const table_1 = require("./wml/table");
class TableLayoutPage {
    constructor() {
        this.view = new table_1.Main(this);
    }
}
exports.TableLayoutPage = TableLayoutPage;
exports.default = new TableLayoutPage();
//# sourceMappingURL=index.js.map