"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/grid");
var GridLayoutPage = /** @class */ (function () {
    function GridLayoutPage() {
        this.view = new views.Main(this);
        this.values = {
            root: {
                className: 'grid-layout-example'
            }
        };
    }
    return GridLayoutPage;
}());
exports.GridLayoutPage = GridLayoutPage;
exports.default = new GridLayoutPage();
//# sourceMappingURL=index.js.map