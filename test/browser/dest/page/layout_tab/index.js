"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabLayoutPage = void 0;
const views = require("./wml/tab");
class TabLayoutPage {
    constructor() {
        this.view = new views.Main(this);
        this.tabs = {
            first: {
                text: 'First',
                contentFun: views.firstTab
            },
            second: {
                text: 'Second',
                contentFun: views.secondTab
            },
            third: {
                text: 'Third',
                contentFun: views.thirdTab
            }
        };
    }
}
exports.TabLayoutPage = TabLayoutPage;
exports.default = new TabLayoutPage();
//# sourceMappingURL=index.js.map