"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/inform");
var InformPage = /** @class */ (function () {
    function InformPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.v = new views.Open(this);
        this.values = {
            title: 'Something happened',
            message: 'Zing! Something you happened!',
            onClose: function () {
                alert('Buh Bye');
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
    return InformPage;
}());
exports.InformPage = InformPage;
exports.default = new InformPage();
//# sourceMappingURL=index.js.map