"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThumbnailPage = void 0;
const views = require("./wml/thumbnail");
class ThumbnailPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            onClick: () => alert('You clicked it!')
        };
    }
}
exports.ThumbnailPage = ThumbnailPage;
exports.default = new ThumbnailPage();
//# sourceMappingURL=index.js.map