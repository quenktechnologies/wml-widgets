"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeterPage = void 0;
const views = require("./wml/meter");
class MeterPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            message: 'This is an alert',
            bars: [
                { value: 10, color: 'red' },
                { value: 50, color: 'green' },
                { value: 40, color: 'blue' }
            ],
            inc: () => {
                let m = this.view.findById('single');
                if (m.isJust())
                    m.get().increase(10);
            },
            dec: () => {
                let m = this.view.findById('single');
                if (m.isJust())
                    m.get().decrease(10);
            }
        };
    }
}
exports.MeterPage = MeterPage;
exports.default = new MeterPage();
//# sourceMappingURL=index.js.map