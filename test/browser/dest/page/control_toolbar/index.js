"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarPage = void 0;
const views = require("./wml/toolbar");
class ToolbarPage {
    constructor() {
        this.view = new views.Main(this);
    }
}
exports.ToolbarPage = ToolbarPage;
exports.default = new ToolbarPage();
//# sourceMappingURL=index.js.map