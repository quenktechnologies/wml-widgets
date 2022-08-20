"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagerPage = void 0;
const views = require("./pager");
const scenes = [
    'Page 1',
    'Page 2',
    'Page 3',
    'Page 4',
    'Page 5',
    'Page 6',
    'Page 7',
    'Page 8',
    'Page 9',
    'Page 10'
];
class PagerPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            message: scenes[0],
            total: scenes.length,
            current: 1,
            onChange: (e) => {
                this.values.current = e.value;
                this.values.message = scenes[this.values.current - 1];
                this.view.invalidate();
            }
        };
    }
}
exports.PagerPage = PagerPage;
exports.default = new PagerPage();
//# sourceMappingURL=index.js.map