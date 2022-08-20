"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatorPage = void 0;
const views = require("./wml/paginator");
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
class PaginatorPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            message: scenes[0],
            current: 1,
            total: scenes.length,
            onChange: (e) => {
                this.values.message = scenes[e.value - 1];
                this.values.current = e.value;
                this.view.invalidate();
            }
        };
    }
}
exports.PaginatorPage = PaginatorPage;
exports.default = new PaginatorPage();
//# sourceMappingURL=index.js.map