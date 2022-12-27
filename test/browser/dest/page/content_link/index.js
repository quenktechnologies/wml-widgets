"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkPage = void 0;
const views = require("./views");
let linkStates = ['-default', '-primary', '-warning', '-error'];
class LinkPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            onClick: () => alert('You clicked me?'),
            currentLinkState: 0,
            getState: () => linkStates[this.values.currentLinkState],
            onLinkClick: () => {
                this.values.currentLinkState++;
                if (this.values.currentLinkState >= linkStates.length)
                    this.values.currentLinkState = 0;
                this.view.invalidate();
            }
        };
    }
}
exports.LinkPage = LinkPage;
exports.default = new LinkPage();
//# sourceMappingURL=index.js.map