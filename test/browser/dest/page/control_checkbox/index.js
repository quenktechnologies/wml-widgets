"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxPage = void 0;
var views = require("./wml/checkbox");
var CheckboxPage = /** @class */ (function () {
    function CheckboxPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.value = true;
        this.onChange = function (_a) {
            var value = _a.value;
            _this.view.findById('content')
                .map(function (e) {
                while (e.firstChild)
                    e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(value === true ?
                    'on' :
                    (value === false ? 'off' : 'error')));
            });
        };
    }
    return CheckboxPage;
}());
exports.CheckboxPage = CheckboxPage;
exports.default = new CheckboxPage();
//# sourceMappingURL=index.js.map