"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Callout = exports.CALLOUT = exports.Style = void 0;
const wml_1 = require("@quenk/wml");
const style_1 = require("../../content/style");
Object.defineProperty(exports, "Style", { enumerable: true, get: function () { return style_1.Style; } });
const util_1 = require("../../util");
const __1 = require("../../");
const callout_1 = require("./wml/callout");
///classNames:begin
exports.CALLOUT = 'ww-callout';
/**
 * Callout
 */
class Callout extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new callout_1.Main(this);
        this.values = {
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.CALLOUT, __1.getClassName(this.attrs), (this.attrs.ww && this.attrs.ww.style) ?
                style_1.getStyleClassName(this.attrs.ww.style) :
                style_1.DEFAULT)
        };
    }
}
exports.Callout = Callout;
//# sourceMappingURL=index.js.map