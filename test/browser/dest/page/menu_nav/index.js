"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavPage = void 0;
const nav_1 = require("./wml/nav");
class NavPage {
    constructor() {
        this.view = new nav_1.Main(this);
    }
}
exports.NavPage = NavPage;
exports.default = new NavPage();
//# sourceMappingURL=index.js.map