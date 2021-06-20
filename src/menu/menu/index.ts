import * as hidden from '../../content/state/hidden';
import * as headerViews from './wml/header';
import { View, Component, Content } from '@quenk/wml';
import { text } from '@quenk/wml/lib/dom';
import { concat } from '../../util';
import { BLOCK } from '../../content/orientation';
import { WidgetAttrs, HTMLElementAttrs, getId, getClassName } from '../../';
import { Main } from './wml/menu';

///classNames:begin
export const MENU = 'ww-menu';
export const MENU_HEADER_ITEM = 'ww-menu__header-item';
///classNames:end

export const NAV_MODE = 'nav';
export const CONTENT_MODE = 'content';

/**
 * MenuAttrs
 */
export interface MenuAttrs extends HTMLElementAttrs {

    /**
     * hidden indicates the menu should be hidden.
     */
    hidden?: boolean,

    /**
     * block display
     */
    block?: boolean

}

/**
 * HeaderAttrs
 */
export interface HeaderAttrs extends HTMLElementAttrs {

    /**
     * text
     */
    text: string

}

/**
 * HeaderItem
 */
export class HeaderItem extends Component<WidgetAttrs<HeaderAttrs>> {

    view: View = new headerViews.Main(this);

    values = {

        root: {

            className: concat(MENU_HEADER_ITEM, getClassName(this.attrs)),

            content: (this.attrs.ww && this.attrs.ww.text) ?
                [text(this.attrs.ww.text)] : this.children

        }

    }

}

/**
 * Menu provides a DOM container for rendering
 * a dropdown style menu.
 */
export class Menu extends Component<WidgetAttrs<MenuAttrs>>
    implements hidden.Hidable {

    view: View = new Main(this);

    values = {

        root: {

            wml: {

                id: 'root'

            },

            id: getId(this.attrs),

            className: concat(MENU, getClassName(this.attrs),
                (this.attrs.ww && this.attrs.ww.hidden) ? hidden.HIDDEN : '',
                (this.attrs.ww && this.attrs.ww.block) ? BLOCK : '')

        },
        menu: {

            id: 'menu'

        },
        content: () => this.children

    };

    isHidden(): boolean {

        return hidden.isHidden(this.view, this.values.root.wml.id);

    }

    hide(): Menu {

        hidden.hide(this.view, this.values.root.wml.id);
        return this;

    }

    show(): Menu {

        hidden.show(this.view, this.values.root.wml.id);
        return this;

    }

    toggle(): Menu {

        hidden.toggle(this.view, this.values.root.wml.id);
        return this;

    }

    setContent(content: Content[]): Menu {

        this.values.content = () => content;
        this.view.invalidate();
        this.show();
        return this;

    }

}

