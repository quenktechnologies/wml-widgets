"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThumbnailPage = void 0;
var views = require("./wml/thumbnail");
var ThumbnailPage = /** @class */ (function () {
    function ThumbnailPage() {
        this.view = new views.Main(this);
        this.values = {
            onClick: function () { return alert('You clicked it!'); }
        };
    }
    return ThumbnailPage;
}());
exports.ThumbnailPage = ThumbnailPage;
exports.default = new ThumbnailPage();
//# sourceMappingURL=index.js.map