"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDownPage = void 0;
const views = require("./wml/drop-down");
class DropDownPage {
    constructor() {
        this.view = new views.Main(this);
        this.onClick = (msg) => (e) => {
            e.preventDefault();
            alert(msg);
        };
    }
}
exports.DropDownPage = DropDownPage;
exports.default = new DropDownPage();
//# sourceMappingURL=index.js.map