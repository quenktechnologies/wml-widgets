"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/switch");
var Page_1 = require("../Page");
var SwitchPage = /** @class */ (function (_super) {
    __extends(SwitchPage, _super);
    function SwitchPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.value = true;
        _this.onChange = function (_a) {
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
        return _this;
    }
    return SwitchPage;
}(Page_1.Page));
exports.SwitchPage = SwitchPage;
//# sourceMappingURL=index.js.map