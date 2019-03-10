"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nav_1 = require("./wml/nav");
var NavPage = /** @class */ (function () {
    function NavPage() {
        this.view = new nav_1.Main(this);
    }
    return NavPage;
}());
exports.NavPage = NavPage;
exports.default = new NavPage();
//# sourceMappingURL=index.js.map