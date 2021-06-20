"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuPage = void 0;
var menu_1 = require("./wml/menu");
var MenuPage = /** @class */ (function () {
    function MenuPage() {
        this.view = new menu_1.Main(this);
    }
    return MenuPage;
}());
exports.MenuPage = MenuPage;
exports.default = new MenuPage();
//# sourceMappingURL=index.js.map