"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = exports.ButtonClickedEvent = exports.BUTTON = exports.Style = void 0;
const views = require("./wml/button");
const dom_1 = require("@quenk/wml/lib/dom");
const toolbar_1 = require("../toolbar");
const active_1 = require("../../content/state/active");
const orientation_1 = require("../../content/orientation");
const style_1 = require("../../content/style");
Object.defineProperty(exports, "Style", { enumerable: true, get: function () { return style_1.Style; } });
const size_1 = require("../../content/size");
const util_1 = require("../../util");
const __1 = require("../../");
const __2 = require("../");
///classNames:begin
exports.BUTTON = 'ww-button';
;
/**
 * ButtonClickedEvent
 */
class ButtonClickedEvent extends __2.Event {
}
exports.ButtonClickedEvent = ButtonClickedEvent;
/**
 * Button is an improvement over HTMLButtionElement
 */
class Button extends __2.AbstractControl {
    constructor() {
        super(...arguments);
        this.view = (this.attrs.ww && this.attrs.ww.anchor) ?
            new views.AnchorView(this) : new views.ButtonView(this);
        this.values = {
            button: {
                wml: {
                    id: 'button'
                },
                id: __1.getId(this.attrs),
                className: util_1.concat(exports.BUTTON, __1.getClassName(this.attrs), toolbar_1.TOOLBAR_COMPAT, (this.attrs.ww && this.attrs.ww.style) ?
                    style_1.getStyleClassName(this.attrs.ww.style) :
                    style_1.DEFAULT, (this.attrs.ww && this.attrs.ww.size) ?
                    size_1.getSizeClassName(this.attrs.ww.size) : '', (this.attrs.ww && this.attrs.ww.outline) ?
                    style_1.OUTLINE : '', (this.attrs.ww && this.attrs.ww.block) ?
                    orientation_1.BLOCK : '', (this.attrs.ww && this.attrs.ww.active) ?
                    active_1.ACTIVE : ''),
                type: (this.attrs.ww && this.attrs.ww.type) ?
                    this.attrs.ww.type : 'button',
                name: (this.attrs.ww && this.attrs.ww.name) ? this.attrs.ww.name : '',
                disabled: (this.attrs.ww && this.attrs.ww.disabled) ? true : null,
                anchor: (this.attrs.ww && this.attrs.ww.anchor) ?
                    this.attrs.ww.anchor : false,
                onclick: (e) => {
                    e.preventDefault();
                    this.attrs.ww &&
                        this.attrs.ww.onClick &&
                        this.attrs.ww.onClick(new ButtonClickedEvent((this.attrs.ww && this.attrs.ww.name) ?
                            this.attrs.ww.name : '', this.attrs.ww.value));
                },
                content: () => (this.attrs.ww && this.attrs.ww.text) ?
                    [dom_1.text(this.attrs.ww.text)] : this.children
            }
        };
    }
    /**
     * disable this button.
     */
    disable() {
        util_1.getById(this.view, this.values.button.wml.id)
            .map((b) => b.setAttribute('disabled', 'disabled'));
    }
    /**
     * enable this button.
     */
    enable() {
        util_1.getById(this.view, this.values.button.wml.id)
            .map((b) => b.removeAttribute('disabled'));
    }
    /**
     * toggle the disabled state of this button.
     */
    toggle() {
        util_1.getById(this.view, this.values.button.wml.id)
            .map((b) => b.hasAttribute('disabled') ?
            this.enable() : this.disable());
    }
}
exports.Button = Button;
//# sourceMappingURL=index.js.map