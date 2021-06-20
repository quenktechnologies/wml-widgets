"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputPage = void 0;
var views = require("./wml/text-input");
var size_1 = require("../../../../../lib/content/size");
var TextInputPage = /** @class */ (function () {
    function TextInputPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.sizes = [
            size_1.Size.ExtraSmall,
            size_1.Size.Small,
            size_1.Size.Medium,
            size_1.Size.Large,
            size_1.Size.ExtraLarge
        ];
        this.content = function () { return document.createTextNode('this'); };
        this.onChange = function (_a) {
            var value = _a.value;
            _this
                .view
                .findById('txt')
                .map(function (h) { return h.innerHTML = value; });
        };
    }
    return TextInputPage;
}());
exports.TextInputPage = TextInputPage;
exports.default = new TextInputPage();
//# sourceMappingURL=index.js.map