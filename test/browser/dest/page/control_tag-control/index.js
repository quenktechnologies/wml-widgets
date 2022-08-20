"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagPage = void 0;
const views = require("./wml/tag");
const style_1 = require("../../../../../lib/content/style");
const getStyles = () => [
    style_1.Style.Default,
    style_1.Style.Primary,
    style_1.Style.Success,
    style_1.Style.Info,
    style_1.Style.Warning,
    style_1.Style.Error
];
class TagPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            capitalize: (s) => `${s[0].toUpperCase()}${s.slice(1)}`,
            styles: getStyles(),
            onDismiss: (e) => {
                let idx = this.values.styles.indexOf(e.name);
                if (idx > -1)
                    this.values.styles.splice(idx, 1);
                if (this.values.styles.length === 0)
                    this.values.styles = getStyles();
                this.view.invalidate();
            }
        };
    }
}
exports.TagPage = TagPage;
exports.default = new TagPage();
//# sourceMappingURL=index.js.map