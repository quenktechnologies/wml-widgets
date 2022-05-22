"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkPage = void 0;
var views = require("./views");
var LinkPage = /** @class */ (function () {
    function LinkPage() {
        this.view = new views.Main(this);
        this.values = {
            onClick: function () { return alert('You clicked me?'); }
        };
    }
    return LinkPage;
}());
exports.LinkPage = LinkPage;
exports.default = new LinkPage();
//# sourceMappingURL=index.js.map