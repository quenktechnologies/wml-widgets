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
        this.view = (this.attrs && this.attrs.anchor) ?
            new views.AnchorView(this) : new views.ButtonView(this);
        this.values = {
            button: {
                wml: {
                    id: 'button'
                },
                id: (0, __1.getId)(this.attrs),
                className: (0, util_1.concat)(exports.BUTTON, (0, __1.getClassName)(this.attrs), toolbar_1.TOOLBAR_COMPAT, (this.attrs && this.attrs.style) ?
                    (0, style_1.getStyleClassName)(this.attrs.style) :
                    style_1.DEFAULT, (this.attrs && this.attrs.size) ?
                    (0, size_1.getSizeClassName)(this.attrs.size) : '', (this.attrs && this.attrs.outline) ?
                    style_1.OUTLINE : '', (this.attrs && this.attrs.block) ?
                    orientation_1.BLOCK : '', (this.attrs && this.attrs.active) ?
                    active_1.ACTIVE : ''),
                type: (this.attrs && this.attrs.type) ?
                    this.attrs.type : 'button',
                name: (this.attrs && this.attrs.name) ? this.attrs.name : '',
                disabled: (this.attrs && this.attrs.disabled) ? true : null,
                anchor: (this.attrs && this.attrs.anchor) ?
                    this.attrs.anchor : false,
                onclick: (e) => {
                    e.preventDefault();
                    this.attrs &&
                        this.attrs.onClick &&
                        this.attrs.onClick(new ButtonClickedEvent((this.attrs && this.attrs.name) ?
                            this.attrs.name : '', this.attrs.value));
                },
                content: () => (this.attrs && this.attrs.text) ?
                    [(0, dom_1.text)(this.attrs.text)] : this.children
            }
        };
    }
    /**
     * disable this button.
     */
    disable() {
        (0, util_1.getById)(this.view, this.values.button.wml.id)
            .map((b) => b.setAttribute('disabled', 'disabled'));
    }
    /**
     * enable this button.
     */
    enable() {
        (0, util_1.getById)(this.view, this.values.button.wml.id)
            .map((b) => b.removeAttribute('disabled'));
    }
    /**
     * toggle the disabled state of this button.
     */
    toggle() {
        (0, util_1.getById)(this.view, this.values.button.wml.id)
            .map((b) => b.hasAttribute('disabled') ?
            this.enable() : this.disable());
    }
}
exports.Button = Button;
//# sourceMappingURL=index.js.map