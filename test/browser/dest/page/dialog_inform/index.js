"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformPage = void 0;
const views = require("./wml/inform");
class InformPage {
    constructor() {
        this.view = new views.Main(this);
        this.v = new views.Open(this);
        this.values = {
            title: 'Something happened',
            message: 'Zing! Something you happened!',
            onClose: () => {
                alert('Buh Bye');
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
exports.InformPage = InformPage;
exports.default = new InformPage();
//# sourceMappingURL=index.js.map