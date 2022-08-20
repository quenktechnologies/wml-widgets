"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListLayoutPage = void 0;
const list_1 = require("./wml/list");
class ListLayoutPage {
    constructor() {
        this.view = new list_1.Main(this);
        this.items = {
            'This is the first item.': false,
            'This is the second item.': true,
            'This is the third item.': false
        };
        this.click = (key) => this
            .view
            .findById(key)
            .map(l => l.toggleActive())
            .orJust(() => alert(`Cannot find element by id "${key}"!`));
    }
}
exports.ListLayoutPage = ListLayoutPage;
exports.default = new ListLayoutPage();
//# sourceMappingURL=index.js.map