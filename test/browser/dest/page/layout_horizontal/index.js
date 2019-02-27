"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/horizontal");
var HorizontalLayoutPage = /** @class */ (function () {
    function HorizontalLayoutPage() {
        this.view = new views.Main(this);
    }
    return HorizontalLayoutPage;
}());
exports.HorizontalLayoutPage = HorizontalLayoutPage;
exports.default = new HorizontalLayoutPage();
//# sourceMappingURL=index.js.map