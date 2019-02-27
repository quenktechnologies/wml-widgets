"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/tab");
var TabLayoutPage = /** @class */ (function () {
    function TabLayoutPage() {
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
    return TabLayoutPage;
}());
exports.TabLayoutPage = TabLayoutPage;
exports.default = new TabLayoutPage();
//# sourceMappingURL=index.js.map