"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackPage = void 0;
const views = require("./wml/stack");
const _getValues = () => [
    { label: 'Asus', value: 'Asus' },
    { label: 'MSI', value: 'MSI' },
    { label: 'MSI', value: 'MSI' },
    { label: 'Gigabyte', value: 'Gigabyte' }
];
const _getText = (m) => document.createTextNode(m.map(({ label }) => label).join(','));
class StackPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            values: _getValues(),
            text: _getText(_getValues()),
            decorator: (m) => m.label
        };
        this.onChange = ({ value }) => {
            if (value.length === 0)
                this.values.values = _getValues();
            this.values.text = _getText(this.values.values);
            this.view.invalidate();
        };
    }
}
exports.StackPage = StackPage;
exports.default = new StackPage();
//# sourceMappingURL=index.js.map