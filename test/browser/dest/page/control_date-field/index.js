"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/date-field");
var DateFieldPage = /** @class */ (function () {
    function DateFieldPage() {
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
    return DateFieldPage;
}());
exports.DateFieldPage = DateFieldPage;
exports.default = new DateFieldPage();
//# sourceMappingURL=index.js.map