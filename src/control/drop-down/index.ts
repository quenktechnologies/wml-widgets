import * as views from './wml/drop-down';
import * as hidden from '../../content/state/hidden';
import * as style from '../../content/style';
import { View, Fun, Component } from '@quenk/wml';
import { concat, getById } from '../../util';
import { WidgetAttrs, HTMLElementAttrs, getId, getClassName } from '../../';


///classNames:begin
export const DROP_DOWN = 'ww-drop-down-menu';
export const DROP_DOWN_TOGGLE = 'ww-drop-down-menu__toggle';
export const DROP_DOWN_CONTENT = 'ww-drop-down__content';
///classNames:end

/**
 * ButtonTemplate provides the template for rendering the button part.
 */
export type ButtonTemplate = (b: DropDown) => Fun;

/**
 * DropDownMenuAttrs
 */
export interface DropDownMenuAttrs extends HTMLElementAttrs {

    /**
     * buttonText for the button.
     */
    buttonText?: string,

    /**
     * buttonTemplate for rendering the button.
     */
    buttonTemplate?: ButtonTemplate

    /**
     * autoClose when true, will automatically hide the content.
     * Defaults to true.
     */
    autoClose?: boolean

}

/**
 * DropDown provides a component for displaying a pop up menu.
 *
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
export class DropDown extends Component<WidgetAttrs<DropDownMenuAttrs>>
    implements hidden.Hidable {

    view: View = new views.Main(this);

    values = {

        root: {

            wml: {

                id: 'root'

            },

            id: getId(this.attrs),

            className: concat(DROP_DOWN, getClassName(this.attrs))

        },
        button: {

            text: (this.attrs.ww && this.attrs.ww.buttonText) ?
                this.attrs.ww.buttonText : '',

            className: style.DEFAULT,

            template: (): ButtonTemplate =>
                (this.attrs.ww && this.attrs.ww.buttonTemplate) ?
                    this.attrs.ww.buttonTemplate : views.button,

        },

        toggle: {

            className: concat(DROP_DOWN_TOGGLE, style.PRIMARY),

            onClick: () => {

                getById<HTMLElement>(this.view, this.values.root.wml.id)
                    .map((e: HTMLElement) => {

                        if (this.values.content.autoClose) {
                            for (let i = 0; i < e.children.length; i++) {
                                e.children[i].removeEventListener('click', this.hide);
                                e.children[i].addEventListener('click', this.hide);
                            }
                        }

                    })
                    .map(this.toggle)
                    .map(() => window.addEventListener('click', this))

            }

        },
        content: {

            wml: {

                id: 'content'
            },

            className: concat(DROP_DOWN_CONTENT, hidden.HIDDEN),

            autoClose: (this.attrs.ww && this.attrs.ww.autoClose === false) ?
                false : true,

            render: () => this.children

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
