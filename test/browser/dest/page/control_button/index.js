"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonPage = void 0;
const views = require("./wml/button");
const style_1 = require("../../../../../lib/content/style");
const size_1 = require("../../../../../lib/content/size");
class ButtonPage {
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
            ],
            sizes: [
                size_1.Size.ExtraSmall,
                size_1.Size.Small,
                size_1.Size.Medium,
                size_1.Size.Large,
                size_1.Size.ExtraLarge
            ]
        };
    }
}
exports.ButtonPage = ButtonPage;
exports.default = new ButtonPage();
//# sourceMappingURL=index.js.map