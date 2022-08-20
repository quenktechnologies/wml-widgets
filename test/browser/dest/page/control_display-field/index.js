"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayFieldPage = void 0;
const views = require("./wml/display-field");
const style_1 = require("../../../../../lib/content/style");
const getStyles = () => [
    style_1.Style.Default,
    style_1.Style.Primary,
    style_1.Style.Success,
    style_1.Style.Info,
    style_1.Style.Warning,
    style_1.Style.Error
];
class DisplayFieldPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            capitalize: (s) => `${s[0].toUpperCase()}${s.slice(1)}`,
            styles: getStyles()
        };
    }
}
exports.DisplayFieldPage = DisplayFieldPage;
exports.default = new DisplayFieldPage();
//# sourceMappingURL=index.js.map