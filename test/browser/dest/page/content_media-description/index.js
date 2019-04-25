"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/media-description");
var MediaDescriptionPage = /** @class */ (function () {
    function MediaDescriptionPage() {
        this.view = new views.Main(this);
        this.values = {};
    }
    return MediaDescriptionPage;
}());
exports.MediaDescriptionPage = MediaDescriptionPage;
exports.default = new MediaDescriptionPage();
//# sourceMappingURL=index.js.map