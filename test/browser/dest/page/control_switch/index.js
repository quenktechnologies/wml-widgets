"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchPage = void 0;
const views = require("./wml/switch");
class SwitchPage {
    constructor() {
        this.view = new views.Main(this);
        this.value = true;
        this.onChange = ({ value }) => {
            this.view.findById('content')
                .map((e) => {
                while (e.firstChild)
                    e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(value === true ?
                    'on' :
                    (value === false ? 'off' : 'error')));
            });
        };
    }
}
exports.SwitchPage = SwitchPage;
exports.default = new SwitchPage();
//# sourceMappingURL=index.js.map