"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelPage = void 0;
var panel_1 = require("./wml/panel");
var PanelPage = /** @class */ (function () {
    function PanelPage() {
        this.view = new panel_1.Main(this);
    }
    return PanelPage;
}());
exports.PanelPage = PanelPage;
exports.default = new PanelPage();
//# sourceMappingURL=index.js.map