import * as hidden from '../../content/state/hidden';

import { Component, Content } from '@quenk/wml';

import { concat, getById } from '../../util';
import { HTMLElementAttrs, getId, getClassName } from '../../';
import { ACTIVE } from '../../content/state/active';
import { Link, LinkAttrs } from '../../content/link';
import { Name } from '../../control';
import {
    MenuHeaderView,
    MenuItemView,
    MenuDividerView,
    MenuView
} from './views';

///classNames:begin
export const MENU = 'ww-menu';
export const MENU_HEADER = 'ww-menu-header';
export const MENU_ITEM = 'ww-menu-item';
export const MENU_DIVIDER = 'ww-menu-divider';
///classNames:end

/**
 * MenuItemSpecType specifies the type of menu item to auto generate.
 */
export type MenuItemSpecType = string;

/**
 * LinkType specifies the configuration for a Link element.
 */
export interface LinkType extends LinkAttrs {
    /**
     * type must be "link" to be considered valid.
     */
    type: MenuItemSpecType;
}

/**
 * MenuHeaderAttrs
 */
export interface MenuHeaderAttrs extends HTMLElementAttrs {
    /**
     * text for the header
     */
    text?: string;
}

/**
 * MenuHeaderType specifies the configuration for a HeaderItem element.
 */
export interface MenuHeaderType extends MenuHeaderAttrs {
    /**
     * type must be "header" to be considered valid.
     */
    type: MenuItemSpecType;
}

/**
 * MenuHeader displays a styled header among menu items.
 */
export class MenuHeader extends Component<MenuHeaderAttrs> {
    view = new MenuHeaderView(this);

    className = concat(MENU_HEADER, getClassName(this.attrs));
}

export { MenuHeader as Header };

/**
 * MenuItemAttrs
 */
export interface MenuItemAttrs extends HTMLElementAttrs {
    /**
     * name of the Item
     */
    name?: Name;

    /**
     * active state of the Item
     */
    active?: boolean;

    /**
     * text can be specified to display textual content in the link.
     */
    text?: string;

    /**
     * onClick is applied when the Item is clicked.
     */
    onClick?: (e: MenuItemClickedEvent) => void;
}

/**
 * MenuItemClickedEvent is fired when the user clicks on an the item part of a
 * menu item.
 */
export class MenuItemClickedEvent {
    constructor(public name: Name) {}
}

/**
 * MenuItem wraps content in an html <li> element to form a menu.
 *
 * MenuItems should therefore not have any siblings that are not themselves
 * MenuItems.
 */
export class MenuItem extends Component<MenuItemAttrs> {
    view = new MenuItemView(this);

    id = getId(this.attrs);

    className = concat(
        MENU_ITEM,
        this.attrs.active === true ? ACTIVE : '',
        getClassName(this.attrs)
    );
}

export { MenuItem as Item };

/**
 * MenuDividerType specifies the configuration for a divider element.
 */
export interface MenuDividerType extends HTMLElementAttrs {
    /**
     * type must be "divider" to be considered valid.
     */
    type: MenuItemSpecType;
}

/**
 * MenuDivider is used to add a horizontal line in place of an item to siginify
 * a new section.
 */
export class MenuDivider extends Component<HTMLElementAttrs> {
    view = new MenuDividerView(this);

    className = MENU_DIVIDER;
}

export { MenuDivider as Divider };

/**
 * MenuItemSpec specifies menu content that can be auto generated.
 */
export type MenuItemSpec = MenuHeaderType | LinkType | MenuDividerType;

/**
 * MenuAttrs
 */
export interface MenuAttrs extends HTMLElementAttrs {
    /**
     * hidden indicates the menu should be hidden.
     */
    hidden?: boolean;

    /**
     * @deprecated
     */
    block?: boolean;

    /**
     * autoClose when true, will automatically hide the content.
     *
     * Defaults to false.
     */
    autoClose?: boolean;

    /**
     * items can be specified to have the Menu automatically generate content.
     */
    items?: MenuItemSpec[];
}

/**
 * Menu provides a DOM container for rendering
 * a dropdown style menu.
 */
export class Menu extends Component<MenuAttrs> implements hidden.Hidable {
    view = new MenuView(this);

    wmlId = 'root';

    id = getId(this.attrs);

    className = concat(
        MENU,
        getClassName(this.attrs),
        this.attrs.hidden === true ? hidden.HIDDEN : ''
    );

    autoClose = this.attrs.autoClose;

    showing = false;

    items = <Content[]>(this.attrs.items || [])
        .map(item => {
            if (item.type === 'header')
                return new MenuItem({}, [
                    new MenuHeader(item, []).render()
                ]).render();
            else if (item.type === 'link')
                return new MenuItem({}, [new Link(item, []).render()]).render();
            else if (item.type === 'divider')
                return new MenuDivider(item, []).render();
        })
        .filter(content => content != null);

    /**
     * handleEvent listens for clicks on elements outside the menu's tree.
     *
     * When autoClose is not set to false, the menu hides itself from the DOM.
     */
    handleEvent(): void {
        getById<HTMLElement>(this.view, this.wmlId).map((root: HTMLElement) => {
            if (!document.body.contains(root))
                document.removeEventListener('click', this);
            else if (this.showing) this.showing = false;
            else this.hide();
        });
    }

    isHidden(): boolean {
        return hidden.isHidden(this.view, this.wmlId);
    }

    hide(): Menu {
        if (this.autoClose) document.removeEventListener('click', this);

        hidden.hide(this.view, this.wmlId);
        return this;
    }

    show(): Menu {
        this.showing = true;

        hidden.show(this.view, this.wmlId);

        if (this.autoClose) document.addEventListener('click', this);

        return this;
    }

    toggle(): Menu {
        return this.isHidden() ? this.show() : this.hide();
        return this;
    }
}
