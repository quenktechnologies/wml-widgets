"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputGroupPage = void 0;
var views = require("./wml/input-group");
var results_1 = require("../../fixtures/data/results");
var InputGroupPage = /** @class */ (function () {
    function InputGroupPage() {
        this.view = new views.Main(this);
        this.values = {
            dropList: { options: results_1.results }
        };
    }
    return InputGroupPage;
}());
exports.InputGroupPage = InputGroupPage;
exports.default = new InputGroupPage();
//# sourceMappingURL=index.js.map