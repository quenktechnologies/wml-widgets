"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Page = /** @class */ (function () {
    function Page(app) {
        this.app = app;
    }
    Page.prototype.get = function (id, fn) {
        this
            .view
            .findById(id)
            .map(fn)
            .orJust(function () { return console.warn(id + ": is missing"); });
    };
    return Page;
}());
exports.Page = Page;
//# sourceMappingURL=Page.js.map