"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/callout");
var style_1 = require("../../../../../lib/content/style");
var CalloutPage = /** @class */ (function () {
    function CalloutPage() {
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
            ]
        };
    }
    return CalloutPage;
}());
exports.CalloutPage = CalloutPage;
exports.default = new CalloutPage();
//# sourceMappingURL=index.js.map