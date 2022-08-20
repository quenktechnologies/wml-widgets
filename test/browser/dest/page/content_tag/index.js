"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagPage = void 0;
const views = require("./wml/tag");
const style_1 = require("../../../../../lib/content/style");
class TagPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            capitalize: (s) => `${s[0].toUpperCase()}${s.slice(1)}`,
            styles: [
                style_1.Style.Default,
                style_1.Style.Primary,
                style_1.Style.Success,
                style_1.Style.Info,
                style_1.Style.Warning,
                style_1.Style.Error
            ]
        };
    }
}
exports.TagPage = TagPage;
exports.default = new TagPage();
//# sourceMappingURL=index.js.map