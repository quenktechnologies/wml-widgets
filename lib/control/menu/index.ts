import * as hidden from '../../content/state/hidden';
import * as dividerViews from './wml/divider';
import * as headerViews from './wml/header';
import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { WidgetAttrs, StylableAttrs } from '../../';
import { Main } from './wml/menu';

export { Item } from '../../content/nav/item';

///classNames:begin
export const MENU = 'ww-menu';
export const MENU_DIVIDER = 'ww-menu__divider';
export const MENU_HEADER = 'ww-menu__header';
///classNames:end

export const NAV_MODE = 'nav';
export const CONTENT_MODE = 'content';

const get = (m: Menu) => () => m.view.findById<HTMLElement>(m.values.root.id);

/**
 * MenuAttrs
 */
export interface MenuAttrs extends StylableAttrs {

    /**
     * hidden indicates the menu should be hidden.
     */
    hidden?: boolean

}

/**
 * HeaderAttrs
 */
export interface HeaderAttrs extends StylableAttrs {

    /**
     * text
     */
    text: string

}

/**
 * Header
 */
export class Header extends Component<WidgetAttrs<HeaderAttrs>> {

    view: View = new headerViews.Main(this);

    values = {

        root: {

            class: concat(MENU_HEADER,
                this.attrs.ww ? this.attrs.ww.class : '')

        },

        text: (this.attrs.ww && this.attrs.ww.text) ?
            this.attrs.ww.text : null

    }

}

/**
 * Divider
 */
export class Divider extends Component<WidgetAttrs<StylableAttrs>> {

    view: View = new dividerViews.Main(this);

    values = {

        root: {

            class: MENU_DIVIDER

        }

    }

}

/**
 * Menu provides a DOM container for rendering
 * a dropdown style menu.
 */
export class Menu extends Component<WidgetAttrs<MenuAttrs>> implements hidden.Hidable {

    view: View = new Main(this);

    isHidden: hidden.IsHidden = hidden.isHidden(get(this));

    hide: hidden.Hide<Menu> = hidden.hide(this)(get(this));

    show: hidden.Show<Menu> = hidden.show(this)(get(this));

    toggle: hidden.Toggle<Menu> = hidden.toggle(this)(get(this));

    values = {

        /**
         * root level values.
         */
        root: {

            id: 'root',
            class: concat(MENU, (this.attrs.ww && this.attrs.ww.class) ?
                this.attrs.ww.class : '', (this.attrs.ww && this.attrs.ww.hidden) ?
                    hidden.HIDDEN : '')

        },
        menu: {

            id: 'menu'

        },
        content: () => this.children

    };

    /**
     * setContent of this Menu.
     */
    setContent(view: View): Menu {

        this.values.content = () => [view.render()];
        this.view.invalidate();
        this.show();
        return this;

    }

}

