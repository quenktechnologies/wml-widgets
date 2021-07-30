"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputGroupPage = void 0;
var views = require("./wml/input-group");
var InputGroupPage = /** @class */ (function () {
    function InputGroupPage() {
        this.view = new views.Main(this);
    }
    return InputGroupPage;
}());
exports.InputGroupPage = InputGroupPage;
exports.default = new InputGroupPage();
//# sourceMappingURL=index.js.map