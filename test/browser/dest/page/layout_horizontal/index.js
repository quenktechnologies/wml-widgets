"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalLayoutPage = void 0;
const views = require("./wml/horizontal");
class HorizontalLayoutPage {
    constructor() {
        this.view = new views.Main(this);
    }
}
exports.HorizontalLayoutPage = HorizontalLayoutPage;
exports.default = new HorizontalLayoutPage();
//# sourceMappingURL=index.js.map