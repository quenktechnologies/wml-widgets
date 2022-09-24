"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = exports.LABEL = void 0;
const document = require("@quenk/wml/lib/dom");
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
const label_1 = require("./wml/label");
///classNames:begin
exports.LABEL = 'ww-label';
/**
 * Label
 */
class Label extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new label_1.Main(this);
        this.values = {
            label: {
                className: (0, util_1.concat)(exports.LABEL, (0, __1.getClassName)(this.attrs)),
                for: (this.attrs && this.attrs.for) ?
                    this.attrs.for : '',
                text: (this.attrs && this.attrs.text) ?
                    [document.createTextNode(this.attrs.text)] : this.children
            }
        };
    }
}
exports.Label = Label;
//# sourceMappingURL=index.js.map