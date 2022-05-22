"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagerPage = void 0;
var views = require("./pager");
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
var PagerPage = /** @class */ (function () {
    function PagerPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.values = {
            message: scenes[0],
            total: scenes.length,
            current: 1,
            onChange: function (e) {
                _this.values.current = e.value;
                _this.values.message = scenes[_this.values.current - 1];
                _this.view.invalidate();
            }
        };
    }
    return PagerPage;
}());
exports.PagerPage = PagerPage;
exports.default = new PagerPage();
//# sourceMappingURL=index.js.map