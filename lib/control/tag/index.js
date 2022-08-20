"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.DismissEvent = exports.TAG_CONTROL_DISMISS = exports.TAG_CONTROL_TEXT = exports.TAG_CONTROL = void 0;
const style_1 = require("../../content/style");
const util_1 = require("../../util");
const __1 = require("../../");
const __2 = require("../");
const tag_1 = require("./wml/tag");
///classNames:begin
exports.TAG_CONTROL = 'ww-tag-control';
exports.TAG_CONTROL_TEXT = 'ww-tag-control__text';
exports.TAG_CONTROL_DISMISS = 'ww-tag-control__dismiss';
/**
 * DismissEvent is generated when the close button us clicked.
 */
class DismissEvent extends __2.Event {
    constructor(name) {
        super(name, undefined);
        this.name = name;
    }
}
exports.DismissEvent = DismissEvent;
/**
 * Tag displays some text in a dismissable tag.
 *
 * The difference between this Tag and the one from the content
 * module is that this one is primarily meant to be used as a control
 * or as part of a more complicated control.
 */
class Tag extends __2.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = new tag_1.Main(this);
        this.values = {
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.TAG_CONTROL, __1.getClassName(this.attrs)),
            style: (this.attrs.ww && this.attrs.ww.style) ?
                this.attrs.ww.style : style_1.Style.Default,
            disabled: (this.attrs.ww && this.attrs.ww.disabled) ?
                this.attrs.ww.disabled : false,
            text: {
                className: exports.TAG_CONTROL_TEXT,
                value: (this.attrs.ww && this.attrs.ww.text) ?
                    this.attrs.ww.text : undefined,
            },
            dismiss: {
                className: exports.TAG_CONTROL_DISMISS,
                onClick: () => {
                    if (this.attrs.ww && this.attrs.ww.onDismiss)
                        this.attrs.ww.onDismiss(new DismissEvent(this.attrs.ww && this.attrs.ww.name || ''));
                }
            }
        };
    }
}
exports.Tag = Tag;
//# sourceMappingURL=index.js.map