"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputPage = void 0;
const views = require("./wml/text-input");
const size_1 = require("../../../../../lib/content/size");
class TextInputPage {
    constructor() {
        this.view = new views.Main(this);
        this.sizes = [
            size_1.Size.ExtraSmall,
            size_1.Size.Small,
            size_1.Size.Medium,
            size_1.Size.Large,
            size_1.Size.ExtraLarge
        ];
        this.content = () => document.createTextNode('this');
        this.onChange = ({ value }) => {
            this
                .view
                .findById('txt')
                .map(h => h.innerHTML = value);
        };
    }
}
exports.TextInputPage = TextInputPage;
exports.default = new TextInputPage();
//# sourceMappingURL=index.js.map