"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmPage = void 0;
const views = require("./wml/confirm");
class ConfirmPage {
    constructor() {
        this.view = new views.Main(this);
        this.v = new views.Open(this);
        this.values = {
            title: 'Confirm a message',
            message: 'Would you like to confirm this message?',
            onYes: () => {
                alert('Message confirmed!');
            },
            onNo: () => {
                alert('Message rejected!');
            },
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
exports.ConfirmPage = ConfirmPage;
exports.default = new ConfirmPage();
//# sourceMappingURL=index.js.map