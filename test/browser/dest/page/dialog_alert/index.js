"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertPage = void 0;
var views = require("./wml/alert");
var style_1 = require("../../../../../lib/content/style");
var AlertPage = /** @class */ (function () {
    function AlertPage() {
        this.view = new views.Main(this);
        this.values = {
            capitalize: function (s) { return "" + s[0].toUpperCase() + s.slice(1); },
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
    return AlertPage;
}());
exports.AlertPage = AlertPage;
exports.default = new AlertPage();
//# sourceMappingURL=index.js.map