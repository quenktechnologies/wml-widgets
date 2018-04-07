import * as views from './wml/drop-down-menu';
import * as hidden from '../../content/state/hidden';
import { View, Attrs, Template, Component } from '@quenk/wml';
import { concat } from '../../util';
import { Menu } from '../menu';

const menu = (dm: DropDownMenu) => dm.view.findById<Menu>(dm.values.menu.id);

///classNames:begin
export const DROP_DOWN_MENU = 'ww-drop-down-menu';
export const DROP_DOWN_MENU_BUTTON = 'ww-drop-down-menu__button';
///classNames:end

/**
 * ButtonTemplate provides the template for rendering the button part.
 */
export type ButtonTemplate = (b: DropDownMenu) => Template;

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

    }

}

/**
 * DropDownMenu provides a component for displaying a pop up menu.
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
 *
 */
export class DropDownMenu extends Component<DropDownMenuAttrs>
    implements hidden.Hidable {

    view: View = new views.Main(this);

    isHidden: hidden.IsHidden = () =>
        menu(this).map(m => m.isHidden()).get();

    hide: hidden.Hide<DropDownMenu> = () =>
        menu(this).map(m => console.error(m) || m.hide()).map(() => this).get();

    show: hidden.Show<DropDownMenu> = () =>
        menu(this).map(m => m.show()).map(() => this).get();

    toggle: hidden.Toggle<DropDownMenu> = () =>
        menu(this).map(m => m.toggle()).map(() => this).get();

    values = {

        root: {

            id: 'root',

            class: concat(DROP_DOWN_MENU, (this.attrs.ww && this.attrs.ww.class) ?
                this.attrs.ww.class : '')

        },
        button: {

            text: this.attrs.ww.buttonText ? this.attrs.ww.buttonText : '',

            template: (): ButtonTemplate => this.attrs.ww.buttonTemplate ?
                this.attrs.ww.buttonTemplate : views.button,

            class: DROP_DOWN_MENU_BUTTON,

            onClick: () => {
                this.view.findById(this.values.menu.id).map((m: Menu) => m.toggle());
            }

        },
        menu: {

            id: 'menu',
            content: () => this.children

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

    rendered() {

        this
            .view
            .findById(this.values.root.id)
            .map((root: HTMLElement) => {

                for (let i = 0; i < root.children.length; i++)
                    root.children[i].addEventListener('click', () => this.hide());

            })
            .map(() => window.addEventListener('click', this));

    }

}
