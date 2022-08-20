"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WellPage = void 0;
const views = require("./wml/well");
class WellPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {};
    }
}
exports.WellPage = WellPage;
exports.default = new WellPage();
//# sourceMappingURL=index.js.map