import * as views from './wml/drop-down';
import * as hidden from '../../content/state/hidden';
import * as style from '../../content/style';

import { View, Component } from '@quenk/wml';

import { Style } from '../../content/style';
import { BUTTON_GROUP_COMPAT } from '../button-group';
import { concat, getById } from '../../util';
import { HTMLElementAttrs, getId, getClassName } from '../../';

///classNames:begin
export const DROP_DOWN = 'ww-drop-down-menu';
export const DROP_DOWN_TOGGLE = 'ww-drop-down-menu__toggle';
export const DROP_DOWN_CONTENT = 'ww-drop-down__content';
///classNames:end

/**
 * ButtonTemplate provides the template for rendering the button part.
 */
export type ButtonTemplate = (b: DropDown) => View;

/**
 * DropDownMenuAttrs
 */
export interface DropDownMenuAttrs extends HTMLElementAttrs {

    /**
     * buttonClassName
     */
    buttonClassName?: string,

    /**
     * buttonText for the button.
     */
    buttonText?: string,

    /**
     * buttonStyle for the button.
     */
    buttonStyle?: Style,

    /**
     * buttonTemplate for rendering the button.
     */
    buttonTemplate?: ButtonTemplate

    /**
     * autoClose when true, will automatically hide the content.
     * Defaults to true.
     */
    autoClose?: boolean,

    /**
     * anchor if true will use an anchor instead of a button.
     */
    anchor?: boolean,

    /**
     * disabled
     */
    disabled?: boolean

}

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
export class DropDown extends Component<DropDownMenuAttrs>
    implements hidden.Hidable {

    view: View = new views.Main(this);

    values = {

        root: {

            wml: {

                id: 'root'

            },

            id: getId(this.attrs),

            className: concat(DROP_DOWN, BUTTON_GROUP_COMPAT, getClassName(this.attrs))

        },
        button: {

            text: (this.attrs && this.attrs.buttonText) ?
                this.attrs.buttonText : '',

            anchor: (this.attrs && this.attrs.anchor) ?
                this.attrs.anchor : false,

            className: concat(DROP_DOWN_TOGGLE, style.DEFAULT,
                (this.attrs && this.attrs.buttonClassName) ?
                    this.attrs.buttonClassName : ''),

            disabled: (this.attrs && this.attrs.disabled) ?
                this.attrs.disabled : undefined,

            template: () => (this.attrs && this.attrs.buttonTemplate) ?
                this.attrs.buttonTemplate(this) : new views.ButtonView(this),

            onClick: () => {

                let mayRoot =
                    getById<HTMLElement>(this.view, this.values.root.wml.id);

                if (mayRoot.isJust()) {

                    let e: HTMLElement = mayRoot.get();

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

            className: concat(DROP_DOWN_CONTENT, hidden.HIDDEN),

            autoClose: (this.attrs && this.attrs.autoClose === false) ?
                false : true,

            render: () => this.children,

            hide: () => this.hide()

        }

    };

    isHidden(): boolean {

        return hidden.isHidden(this.view, this.values.content.wml.id);

    }

    hide(): DropDown {

        hidden.hide(this.view, this.values.content.wml.id);
        return this;

    }

    show(): DropDown {

        hidden.show(this.view, this.values.content.wml.id);
        return this;

    }

    toggle(): DropDown {

        hidden.toggle(this.view, this.values.content.wml.id);
        return this;

    }

    handleEvent(e: Event): void {

        getById<HTMLElement>(this.view, this.values.root.wml.id)
            .map((root: HTMLElement) => {

                if (!document.body.contains(root))
                    document.removeEventListener('click', this);

                if ((!root.contains(<Node>e.target)))
                    this.hide();

            });

    }

}
