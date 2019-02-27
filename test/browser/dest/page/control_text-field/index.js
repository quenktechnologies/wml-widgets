"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/text-field");
var TextFieldPage = /** @class */ (function () {
    function TextFieldPage() {
        this.id = 'text';
        this.view = new views.Main(this);
        this.onChange = function () {
        };
    }
    return TextFieldPage;
}());
exports.TextFieldPage = TextFieldPage;
exports.default = new TextFieldPage();
//# sourceMappingURL=index.js.map