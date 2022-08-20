"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadSurfacePage = void 0;
const views = require("./wml/file-upload-surface");
class FileUploadSurfacePage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {};
    }
}
exports.FileUploadSurfacePage = FileUploadSurfacePage;
exports.default = new FileUploadSurfacePage();
//# sourceMappingURL=index.js.map