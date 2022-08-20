"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Demo = void 0;
const wml = require("@quenk/wml");
const views = require("./wml/demo");
class Demo extends wml.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            size: this.attrs.size,
            offset: this.attrs.offset
        };
    }
}
exports.Demo = Demo;
//# sourceMappingURL=index.js.map