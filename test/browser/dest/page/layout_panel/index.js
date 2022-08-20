"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelPage = void 0;
const panel_1 = require("./wml/panel");
class PanelPage {
    constructor() {
        this.view = new panel_1.Main(this);
    }
}
exports.PanelPage = PanelPage;
exports.default = new PanelPage();
//# sourceMappingURL=index.js.map