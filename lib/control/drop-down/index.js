"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropDown = exports.DROP_DOWN_CONTENT = exports.DROP_DOWN_TOGGLE = exports.DROP_DOWN = void 0;
const views = require("./wml/drop-down");
const hidden = require("../../content/state/hidden");
const style = require("../../content/style");
const wml_1 = require("@quenk/wml");
const button_group_1 = require("../button-group");
const util_1 = require("../../util");
const __1 = require("../../");
///classNames:begin
exports.DROP_DOWN = 'ww-drop-down-menu';
exports.DROP_DOWN_TOGGLE = 'ww-drop-down-menu__toggle';
exports.DROP_DOWN_CONTENT = 'ww-drop-down__content';
/**
 * DropDown provides a component for displaying a pop up menu.
 *
 *    +--------+
 *    |  Menu  |
 *    +--------+
 *    +-------------------------+
 *    |                         |
 *    | ----------------------- |
 *    |                         |
 *    | ----------------------- |
 *    |                         |
 *    | ----------------------- |
 *    |                         |
 *    +-------------------------+
 */
class DropDown extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.values = {
            root: {
                wml: {
                    id: 'root'
                },
                id: __1.getId(this.attrs),
                className: util_1.concat(exports.DROP_DOWN, button_group_1.BUTTON_GROUP_COMPAT, __1.getClassName(this.attrs))
            },
            button: {
                text: (this.attrs.ww && this.attrs.ww.buttonText) ?
                    this.attrs.ww.buttonText : '',
                anchor: (this.attrs.ww && this.attrs.ww.anchor) ?
                    this.attrs.ww.anchor : false,
                className: util_1.concat(exports.DROP_DOWN_TOGGLE, style.DEFAULT, (this.attrs.ww && this.attrs.ww.buttonClassName) ?
                    this.attrs.ww.buttonClassName : ''),
                disabled: (this.attrs.ww && this.attrs.ww.disabled) ?
                    this.attrs.ww.disabled : undefined,
                template: () => (this.attrs.ww && this.attrs.ww.buttonTemplate) ?
                    this.attrs.ww.buttonTemplate(this) : new views.ButtonView(this),
                onClick: () => {
                    let mayRoot = util_1.getById(this.view, this.values.root.wml.id);
                    if (mayRoot.isJust()) {
                        let e = mayRoot.get();
                        if (this.values.content.autoClose) {
                            let hide = this.values.content.hide;
                            //intercept clicks on button and content sections
                            for (let i = 0; i < e.children.length; i++) {
                                //prevent doubling up handlers.
                                e.children[i]
                                    .removeEventListener('click', hide);
                                e.children[i].addEventListener('click', hide);
                            }
                        }
                        this.toggle();
                        window.addEventListener('click', this);
                    }
                }
            },
            content: {
                wml: {
                    id: 'content'
                },
                className: util_1.concat(exports.DROP_DOWN_CONTENT, hidden.HIDDEN),
                autoClose: (this.attrs.ww && this.attrs.ww.autoClose === false) ?
                    false : true,
                render: () => this.children,
                hide: () => this.hide()
            }
        };
    }
    isHidden() {
        return hidden.isHidden(this.view, this.values.content.wml.id);
    }
    hide() {
        hidden.hide(this.view, this.values.content.wml.id);
        return this;
    }
    show() {
        hidden.show(this.view, this.values.content.wml.id);
        return this;
    }
    toggle() {
        hidden.toggle(this.view, this.values.content.wml.id);
        return this;
    }
    handleEvent(e) {
        util_1.getById(this.view, this.values.root.wml.id)
            .map((root) => {
            if (!document.body.contains(root))
                document.removeEventListener('click', this);
            if ((!root.contains(e.target)))
                this.hide();
        });
    }
}
exports.DropDown = DropDown;
//# sourceMappingURL=index.js.map