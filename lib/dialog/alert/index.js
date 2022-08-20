"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = exports.ALERT = exports.Style = void 0;
const dom_1 = require("@quenk/wml/lib/dom");
const wml_1 = require("@quenk/wml");
const style_1 = require("../../content/style");
Object.defineProperty(exports, "Style", { enumerable: true, get: function () { return style_1.Style; } });
const util_1 = require("../../util");
const __1 = require("../../");
const alert_1 = require("./wml/alert");
///classNames:begin
exports.ALERT = 'ww-alert';
/**
 * Alert is used for displaying important messages to users.
 */
class Alert extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new alert_1.Main(this);
        this.values = {
            wml: {
                id: 'alert'
            },
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.ALERT, __1.getClassName(this.attrs), (this.attrs.ww && this.attrs.ww.style) ?
                style_1.getStyleClassName(this.attrs.ww.style) :
                style_1.DEFAULT),
            closable: (this.attrs.ww && this.attrs.ww.closable) ?
                this.attrs.ww.closable : false,
            content: (this.attrs.ww && this.attrs.ww.text) ?
                [dom_1.text(this.attrs.ww.text)] : this.children
        };
    }
    /**
     * close the alert.
     */
    close() {
        let mRoot = util_1.getById(this.view, this.values.wml.id);
        if (mRoot.isJust()) {
            let root = mRoot.get();
            if (root.parentNode)
                root.parentNode.removeChild(root);
        }
    }
}
exports.Alert = Alert;
//# sourceMappingURL=index.js.map