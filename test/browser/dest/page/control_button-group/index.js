"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonGroupPage = void 0;
const views = require("./wml/button-group");
class ButtonGroupPage {
    constructor() {
        this.view = new views.Main(this);
    }
}
exports.ButtonGroupPage = ButtonGroupPage;
exports.default = new ButtonGroupPage();
//# sourceMappingURL=index.js.map