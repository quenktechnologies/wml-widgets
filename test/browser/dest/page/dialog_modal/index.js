"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/modal");
var ModalPage = /** @class */ (function () {
    function ModalPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.v = new views.Open(this);
        this.values = {
            open: function () {
                document.body.appendChild(_this.v.render());
            },
            close: function () {
                _this.v.findById('open')
                    .map(function (m) { return m.close(); });
            }
        };
    }
    return ModalPage;
}());
exports.ModalPage = ModalPage;
exports.default = new ModalPage();
//# sourceMappingURL=index.js.map