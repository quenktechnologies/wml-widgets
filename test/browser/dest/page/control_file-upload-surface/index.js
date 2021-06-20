"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadSurfacePage = void 0;
var views = require("./wml/file-upload-surface");
var FileUploadSurfacePage = /** @class */ (function () {
    function FileUploadSurfacePage() {
        this.view = new views.Main(this);
        this.values = {};
    }
    return FileUploadSurfacePage;
}());
exports.FileUploadSurfacePage = FileUploadSurfacePage;
exports.default = new FileUploadSurfacePage();
//# sourceMappingURL=index.js.map