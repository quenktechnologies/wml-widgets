"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxPage = void 0;
const views = require("./wml/checkbox");
class CheckboxPage {
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
exports.CheckboxPage = CheckboxPage;
exports.default = new CheckboxPage();
//# sourceMappingURL=index.js.map