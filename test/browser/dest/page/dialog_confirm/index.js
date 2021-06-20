"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmPage = void 0;
var views = require("./wml/confirm");
var ConfirmPage = /** @class */ (function () {
    function ConfirmPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.v = new views.Open(this);
        this.values = {
            title: 'Confirm a message',
            message: 'Would you like to confirm this message?',
            onYes: function () {
                alert('Message confirmed!');
            },
            onNo: function () {
                alert('Message rejected!');
            },
            open: function () {
                document.body.appendChild(_this.v.render());
            },
            close: function () {
                _this.v.findById('open')
                    .map(function (m) { return m.close(); });
            }
        };
    }
    return ConfirmPage;
}());
exports.ConfirmPage = ConfirmPage;
exports.default = new ConfirmPage();
//# sourceMappingURL=index.js.map