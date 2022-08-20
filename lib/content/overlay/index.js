"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overlay = exports.OVERLAY = void 0;
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
const overlay_1 = require("./wml/overlay");
///classNames:begin
exports.OVERLAY = 'ww-overlay';
/**
 * Overlay
 */
class Overlay extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new overlay_1.Main(this);
        this.values = {
            wml: {
                id: 'root'
            },
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.OVERLAY, __1.getClassName(this.attrs)),
            onclick: () => {
                if (this.attrs.ww && this.attrs.ww.onClick)
                    this.attrs.ww.onClick();
            }
        };
    }
    /**
     * close the overlay.
     */
    close() {
        let mO = util_1.getById(this.view, this.values.wml.id);
        if (mO.isJust()) {
            let n = mO.get();
            if (n.parentNode)
                n.parentNode.removeChild(n);
        }
    }
}
exports.Overlay = Overlay;
//# sourceMappingURL=index.js.map