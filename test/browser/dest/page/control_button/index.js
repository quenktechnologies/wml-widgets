"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/button");
var style_1 = require("../../../../../lib/content/style");
var size_1 = require("../../../../../lib/content/size");
var ButtonPage = /** @class */ (function () {
    function ButtonPage() {
        this.view = new views.Main(this);
        this.values = {
            capitalize: function (s) { return "" + s[0].toUpperCase() + s.slice(1); },
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
    return ButtonPage;
}());
exports.ButtonPage = ButtonPage;
exports.default = new ButtonPage();
//# sourceMappingURL=index.js.map