"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptPage = void 0;
const views = require("./wml/prompt");
class PromptPage {
    constructor() {
        this.view = new views.Main(this);
        this.v = new views.Open(this);
        this.values = {
            value: 'Click the button bellow to change this text.',
            title: 'Change the text',
            onChange: (e) => this.values.value = e.value,
            onSave: () => {
                this.view.invalidate();
            },
            onCancel: () => {
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
exports.PromptPage = PromptPage;
exports.default = new PromptPage();
//# sourceMappingURL=index.js.map