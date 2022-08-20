"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonSelectPage = void 0;
const views = require("./wml/button-select");
class ButtonSelectPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            options: [
                { text: 'Asus', value: 'Asus' },
                { text: 'MSI', value: 'MSI' },
                { text: 'Gigabyte', value: 'Gigabyte' }
            ],
            value: 'MSI',
            values: ['MSI']
        };
        this.onChange = ({ value, name }) => {
            this
                .view
                .findById(`${name}-content`)
                .map((e) => {
                while (e.lastChild)
                    e.removeChild(e.lastChild);
                e.appendChild(document.createTextNode(String(value)));
            });
        };
        this.onChangeMulti = ({ value, name }) => {
            this
                .view
                .findById(`${name}-content`)
                .map((e) => {
                while (e.lastChild)
                    e.removeChild(e.lastChild);
                e.appendChild(document.createTextNode(String(value)));
            });
        };
    }
}
exports.ButtonSelectPage = ButtonSelectPage;
exports.default = new ButtonSelectPage();
//# sourceMappingURL=index.js.map