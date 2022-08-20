"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangedPagerPage = void 0;
const views = require("./views");
const array_1 = require("@quenk/noni/lib/data/array");
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
class RangedPagerPage {
    constructor() {
        this.view = new views.Main(this);
        this.values = {
            scenes: scenes,
            message: scenes[0],
            max: scenes.length,
            total: scenes.length,
            current: 1,
            onAttrChange: (e) => {
                this.values[e.name] = Number(e.value);
                if (e.name === 'total')
                    this.values.scenes = array_1.make(Number(e.value), i => `Page ${i}`);
            },
            onChange: (e) => {
                this.values.current = e.value;
                this.values.message = this.values.scenes[this.values.current - 1];
                this.view.invalidate();
            },
            reset: () => {
                this.view.invalidate();
            }
        };
    }
}
exports.RangedPagerPage = RangedPagerPage;
exports.default = new RangedPagerPage();
//# sourceMappingURL=index.js.map