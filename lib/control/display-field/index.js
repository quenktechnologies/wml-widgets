"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayField = exports.DISPLAY_FIELD_CONTENT = exports.DISPLAY_FIELD = exports.Style = void 0;
const wml_1 = require("@quenk/wml");
const toolbar_1 = require("../toolbar");
const orientation_1 = require("../../content/orientation");
const disabled_1 = require("../../content/state/disabled");
const style_1 = require("../../content/style");
Object.defineProperty(exports, "Style", { enumerable: true, get: function () { return style_1.Style; } });
const size_1 = require("../../content/size");
const util_1 = require("../../util");
const __1 = require("../../");
const display_field_1 = require("./wml/display-field");
///classNames:begin
exports.DISPLAY_FIELD = 'ww-display-field';
exports.DISPLAY_FIELD_CONTENT = 'ww-display-field__content';
;
/**
 * DisplayField is used to display a value in a text field like box.
 */
class DisplayField extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new display_field_1.Main(this);
        this.values = {
            wml: {
                id: 'display'
            },
            id: __1.getId(this.attrs),
            disabled: (this.attrs.ww && this.attrs.ww.disabled) ?
                this.attrs.ww.disabled : false,
            className: util_1.concat(exports.DISPLAY_FIELD, __1.getClassName(this.attrs), toolbar_1.TOOLBAR_COMPAT, (this.attrs.ww && this.attrs.ww.style) ?
                style_1.getStyleClassName(this.attrs.ww.style) :
                style_1.DEFAULT, (this.attrs.ww && this.attrs.ww.size) ?
                size_1.getSizeClassName(this.attrs.ww.size) : '', (this.attrs.ww && this.attrs.ww.block) ?
                orientation_1.BLOCK : '', (this.attrs.ww && this.attrs.ww.disabled) ?
                disabled_1.DISABLED : ''),
            onclick: (e) => {
                e.stopPropagation(); //prevent a bug when used with ResultsMenu
                if (this.attrs.ww &&
                    this.attrs.ww.onClick &&
                    (!this.values.disabled))
                    this.attrs.ww.onClick();
            },
            content: {
                className: exports.DISPLAY_FIELD_CONTENT
            }
        };
    }
}
exports.DisplayField = DisplayField;
//# sourceMappingURL=index.js.map