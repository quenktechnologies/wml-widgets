"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabBarPage = void 0;
const views = require("./wml/tab-bar");
class TabBarPage {
    constructor() {
        this.view = new views.Main(this);
        this.tab = 'First';
        this.content = document.createTextNode('First Tab');
        this.clicked = ({ name }) => {
            this.tab = name;
            this.content = document.createTextNode(`${name} Tab`);
            this.view.invalidate();
        };
    }
}
exports.TabBarPage = TabBarPage;
exports.default = new TabBarPage();
//# sourceMappingURL=index.js.map