"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatorPage = void 0;
var views = require("./wml/paginator");
var scenes = [
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
var PaginatorPage = /** @class */ (function () {
    function PaginatorPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.values = {
            message: scenes[0],
            current: 1,
            total: scenes.length,
            onChange: function (e) {
                _this.values.message = scenes[e.value - 1];
                _this.values.current = e.value;
                _this.view.invalidate();
            }
        };
    }
    return PaginatorPage;
}());
exports.PaginatorPage = PaginatorPage;
exports.default = new PaginatorPage();
//# sourceMappingURL=index.js.map