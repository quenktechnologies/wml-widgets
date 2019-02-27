"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/switch");
var SwitchPage = /** @class */ (function () {
    function SwitchPage() {
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
    return SwitchPage;
}());
exports.SwitchPage = SwitchPage;
exports.default = new SwitchPage();
//# sourceMappingURL=index.js.map