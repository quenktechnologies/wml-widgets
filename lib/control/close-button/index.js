"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseButton = exports.CLOSE_BUTTON = void 0;
const wml_1 = require("@quenk/wml");
const util_1 = require("../../util");
const __1 = require("../../");
const close_button_1 = require("./wml/close-button");
///classNames:begin
exports.CLOSE_BUTTON = 'ww-close-button';
;
/**
 * CloseButton used to display the "x" on dialogs etc.
 */
class CloseButton extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new close_button_1.Main(this);
        this.values = {
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.CLOSE_BUTTON, __1.getClassName(this.attrs)),
            wml: {
                id: 'close-button'
            },
            onclick: () => {
                if (this.attrs.ww && this.attrs.ww.onClick)
                    this.attrs.ww.onClick();
            }
        };
    }
}
exports.CloseButton = CloseButton;
//# sourceMappingURL=index.js.map