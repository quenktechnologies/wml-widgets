"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuPage = void 0;
const menu_1 = require("./wml/menu");
class MenuPage {
    constructor() {
        this.view = new menu_1.Main(this);
    }
}
exports.MenuPage = MenuPage;
exports.default = new MenuPage();
//# sourceMappingURL=index.js.map