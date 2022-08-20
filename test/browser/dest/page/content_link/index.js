"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkPage = void 0;
const views = require("./views");
class LinkPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            onClick: () => alert('You clicked me?')
        };
    }
}
exports.LinkPage = LinkPage;
exports.default = new LinkPage();
//# sourceMappingURL=index.js.map