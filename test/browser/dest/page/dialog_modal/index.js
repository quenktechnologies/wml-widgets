"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalPage = void 0;
const views = require("./wml/modal");
class ModalPage {
    constructor() {
        this.view = new views.Main(this);
        this.v = new views.Open(this);
        this.values = {
            open: () => {
                document.body.appendChild(this.v.render());
            },
            close: () => {
                this.v.findById('open')
                    .map(m => m.close());
            }
        };
    }
}
exports.ModalPage = ModalPage;
exports.default = new ModalPage();
//# sourceMappingURL=index.js.map