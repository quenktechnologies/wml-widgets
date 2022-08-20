"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaDescriptionPage = void 0;
const views = require("./wml/media-description");
class MediaDescriptionPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {};
    }
}
exports.MediaDescriptionPage = MediaDescriptionPage;
exports.default = new MediaDescriptionPage();
//# sourceMappingURL=index.js.map