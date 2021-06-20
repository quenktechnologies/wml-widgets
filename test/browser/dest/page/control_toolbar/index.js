"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarPage = void 0;
var views = require("./wml/toolbar");
var ToolbarPage = /** @class */ (function () {
    function ToolbarPage() {
        this.view = new views.Main(this);
    }
    return ToolbarPage;
}());
exports.ToolbarPage = ToolbarPage;
exports.default = new ToolbarPage();
//# sourceMappingURL=index.js.map