"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/date");
var DatePage = /** @class */ (function () {
    function DatePage() {
        var _this = this;
        this.view = new views.Main(this);
        this.onChange = function (_a) {
            var value = _a.value;
            _this
                .view
                .findById('selected')
                .map(function (e) {
                while (e.lastChild)
                    e.removeChild(e.lastChild);
                e.appendChild(document.createTextNode(value));
            });
        };
    }
    return DatePage;
}());
exports.DatePage = DatePage;
exports.default = new DatePage();
//# sourceMappingURL=index.js.map