"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputGroupPage = void 0;
const views = require("./wml/input-group");
const results_1 = require("../../fixtures/data/results");
class InputGroupPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            dropList: { options: results_1.results }
        };
    }
}
exports.InputGroupPage = InputGroupPage;
exports.default = new InputGroupPage();
//# sourceMappingURL=index.js.map