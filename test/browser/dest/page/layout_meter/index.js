"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/meter");
var MeterPage = /** @class */ (function () {
    function MeterPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.values = {
            message: 'This is an alert',
            bars: [
                { value: 10, color: 'red' },
                { value: 50, color: 'green' },
                { value: 40, color: 'blue' }
            ],
            inc: function () {
                var m = _this.view.findById('single');
                if (m.isJust())
                    m.get().increase(10);
            },
            dec: function () {
                var m = _this.view.findById('single');
                if (m.isJust())
                    m.get().decrease(10);
            }
        };
    }
    return MeterPage;
}());
exports.MeterPage = MeterPage;
exports.default = new MeterPage();
//# sourceMappingURL=index.js.map