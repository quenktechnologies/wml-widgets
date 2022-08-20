"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertPage = void 0;
const views = require("./wml/alert");
const style_1 = require("../../../../../lib/content/style");
class AlertPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            capitalize: (s) => `${s[0].toUpperCase()}${s.slice(1)}`,
            message: 'This is an alert',
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
exports.AlertPage = AlertPage;
exports.default = new AlertPage();
//# sourceMappingURL=index.js.map