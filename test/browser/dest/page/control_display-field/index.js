"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/display-field");
var style_1 = require("../../../../../lib/content/style");
var getStyles = function () { return [
    style_1.Style.Default,
    style_1.Style.Primary,
    style_1.Style.Success,
    style_1.Style.Info,
    style_1.Style.Warning,
    style_1.Style.Error
]; };
var DisplayFieldPage = /** @class */ (function () {
    function DisplayFieldPage() {
        this.view = new views.Main(this);
        this.values = {
            capitalize: function (s) { return "" + s[0].toUpperCase() + s.slice(1); },
            styles: getStyles()
        };
    }
    return DisplayFieldPage;
}());
exports.DisplayFieldPage = DisplayFieldPage;
exports.default = new DisplayFieldPage();
//# sourceMappingURL=index.js.map