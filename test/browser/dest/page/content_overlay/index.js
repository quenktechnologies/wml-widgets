"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverlayPage = void 0;
const views = require("./wml/overlay");
class OverlayPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            onClick: () => {
                let mO = this.view.findById('overlay');
                if (mO.isJust())
                    mO.get().close();
            }
        };
    }
}
exports.OverlayPage = OverlayPage;
exports.default = new OverlayPage();
//# sourceMappingURL=index.js.map