"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridLayoutPage = void 0;
const views = require("./wml/grid");
class GridLayoutPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            root: {
                className: 'grid-layout-example'
            }
        };
    }
}
exports.GridLayoutPage = GridLayoutPage;
exports.default = new GridLayoutPage();
//# sourceMappingURL=index.js.map