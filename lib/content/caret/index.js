"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caret = exports.CARET = void 0;
const views = require("./wml/caret");
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
///classNames:begin
exports.CARET = 'ww-caret';
/**
 * Caret
 */
class Caret extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                id: (this.attrs && this.attrs.id) ? this.attrs.id : '',
                className: (0, util_1.concat)(exports.CARET, (this.attrs && this.attrs.className) ?
                    this.attrs.className : '')
            }
        };
    }
}
exports.Caret = Caret;
//# sourceMappingURL=index.js.map