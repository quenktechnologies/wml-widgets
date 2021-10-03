"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WellPage = void 0;
var views = require("./wml/well");
var WellPage = /** @class */ (function () {
    function WellPage() {
        this.view = new views.Main(this);
        this.values = {};
    }
    return WellPage;
}());
exports.WellPage = WellPage;
exports.default = new WellPage();
//# sourceMappingURL=index.js.map