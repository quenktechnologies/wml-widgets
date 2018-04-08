import * as views from './wml/drop-down';
import * as hidden from '../../content/state/hidden';
import * as style from '../../content/style';
import { View, Attrs, Template, Component } from '@quenk/wml';
import { concat } from '../../util';

const content = (dm: DropDown) => () =>
    dm.view.findById<HTMLElement>(dm.values.content.id);

///classNames:begin
export const DROP_DOWN = 'ww-drop-down-menu';
export const DROP_DOWN_TOGGLE = 'ww-drop-down-menu__toggle';
export const DROP_DOWN_CONTENT = 'ww-drop-down__content';
///classNames:end

/**
 * ButtonTemplate provides the template for rendering the button part.
 */
export type ButtonTemplate = (b: DropDown) => Template;

/**
 * DropDownMenuAttrs
 */
export interface DropDownMenuAttrs extends Attrs {

    ww?: {

        /**
         * class styles for the root element (ul).
         */
        class?: string,

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
export class DropDown extends Component<DropDownMenuAttrs>
    implements hidden.Hidable {

    view: View = new views.Main(this);

    isHidden: hidden.IsHidden = hidden.isHidden(content(this));

    hide: hidden.Hide<DropDown> = hidden.hide(this)(content(this));

    show: hidden.Show<DropDown> = hidden.show(this)(content(this));

    toggle: hidden.Toggle<DropDown> = hidden.toggle(this)(content(this));

    values = {

        root: {

            id: 'root',

            class: concat(DROP_DOWN, (this.attrs.ww && this.attrs.ww.class) ?
                this.attrs.ww.class : '')

        },
        button: {

            text: this.attrs.ww.buttonText ? this.attrs.ww.buttonText : '',

            class: style.DEFAULT,

            template: (): ButtonTemplate => this.attrs.ww.buttonTemplate ?
                this.attrs.ww.buttonTemplate : views.button,

        },

        toggle: {

            class: concat(DROP_DOWN_TOGGLE, style.PRIMARY),

            onClick: () => {

                this
                    .view
                    .findById(this.values.root.id)
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

            id: 'content',
            class: concat(DROP_DOWN_CONTENT, hidden.HIDDEN),
            autoClose: (this.attrs.ww.autoClose === false) ? false : true,
            render: () => this.children

        }

    };

    handleEvent(e: Event): void {

        this
            .view
            .findById(this.values.root.id)
            .map((root: HTMLElement) => {

                if (!document.body.contains(root))
                    document.removeEventListener('click', this);

                if ((!root.contains(<Node>e.target)))
                    this.hide();

            });

    }

}
