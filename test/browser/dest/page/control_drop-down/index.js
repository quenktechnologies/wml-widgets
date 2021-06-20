"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDownPage = void 0;
var views = require("./wml/drop-down");
var DropDownPage = /** @class */ (function () {
    function DropDownPage() {
        this.view = new views.Main(this);
        this.onClick = function (msg) { return function (e) {
            e.preventDefault();
            alert(msg);
        }; };
    }
    return DropDownPage;
}());
exports.DropDownPage = DropDownPage;
exports.default = new DropDownPage();
//# sourceMappingURL=index.js.map