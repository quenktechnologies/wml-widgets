"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Close = exports.CLOSE = void 0;
const views = require("./wml/close");
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
///classNames:begin
exports.CLOSE = 'ww-close';
/**
 * Close
 */
class Close extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            id: (this.attrs && this.attrs.id) ?
                this.attrs.id : '',
            className: (0, util_1.concat)(exports.CLOSE, (this.attrs && this.attrs.className) ?
                this.attrs.className : ''),
            onClick: (this.attrs && this.attrs.onClick) ?
                this.attrs.onClick : () => { }
        };
    }
}
exports.Close = Close;
//# sourceMappingURL=index.js.map