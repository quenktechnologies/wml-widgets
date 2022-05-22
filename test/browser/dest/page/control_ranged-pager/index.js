"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangedPagerPage = void 0;
var views = require("./views");
var array_1 = require("@quenk/noni/lib/data/array");
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
var RangedPagerPage = /** @class */ (function () {
    function RangedPagerPage() {
        var _this = this;
        this.view = new views.Main(this);
        this.values = {
            scenes: scenes,
            message: scenes[0],
            max: scenes.length,
            total: scenes.length,
            current: 1,
            onAttrChange: function (e) {
                _this.values[e.name] = Number(e.value);
                if (e.name === 'total')
                    _this.values.scenes = array_1.make(Number(e.value), function (i) { return "Page " + i; });
            },
            onChange: function (e) {
                _this.values.current = e.value;
                _this.values.message = _this.values.scenes[_this.values.current - 1];
                _this.view.invalidate();
            },
            reset: function () {
                _this.view.invalidate();
            }
        };
    }
    return RangedPagerPage;
}());
exports.RangedPagerPage = RangedPagerPage;
exports.default = new RangedPagerPage();
//# sourceMappingURL=index.js.map