import * as hidden from '../../content/state/hidden';
import * as style from '../../content/style';

import { Component } from '@quenk/wml';

import { BUTTON_GROUP_COMPAT } from '../button-group';
import { concat, getById } from '../../util';
import { HTMLElementAttrs, getId, getClassName } from '../../';
import {  MenuItemSpec } from '../../menu/menu';
import { MenuButtonView } from './views';

///classNames:begin
export const MENU_BUTTON = 'ww-menu-button';
export const MENU_BUTTON_TOGGLE = 'ww-menu-button-toggle';
export const MENU_BUTTON_CONTENT = 'ww-menu-button-menu';
///classNames:end

/**
 * MenuButtonAttrs
 */
export interface MenuButtonAttrs extends HTMLElementAttrs {

    /**
     * buttonClassName is appended to the button class list.
     *
     * Defaults to "-default".
     */
    buttonClassName?: string,

    /**
     * text for the button.
     */
    text?: string,

    /**
     * items if specified will be rendered instead of the child content.
     */
    items?: MenuItemSpec[],

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
 * MenuButton provides a component for displaying a pop up menu.
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
export class MenuButton extends Component<MenuButtonAttrs>
    implements hidden.Hidable {

    view = new MenuButtonView(this);

    wmlId = 'root';

    id = getId(this.attrs);

    className = concat(MENU_BUTTON, BUTTON_GROUP_COMPAT, getClassName(this.attrs));

    button = {

        text: this.attrs.text,

        anchor: this.attrs.anchor,

        className: concat(MENU_BUTTON_TOGGLE, this.attrs.buttonClassName || style.DEFAULT),

        disabled: this.attrs.disabled,

        onClick: () => {

            this.toggle();

        }

    };

    menu = {

        wmlId: 'content',

        className: MENU_BUTTON_CONTENT,

        hidden: true,

        showing: false,

        autoClose: (this.attrs.autoClose === false) ? false : true,

        items: this.attrs.items,

    };

    /**
     * handleEvent listens for clicks on elements outside the dropdown's
     * tree. 
     *
     * If autoClose is not set to false, the menu will be hidden.
     */
    handleEvent(): void {

        getById<HTMLElement>(this.view, this.wmlId)
            .map((root: HTMLElement) => {
                if (!document.body.contains(root))
                    document.removeEventListener('click', this);
                else if (this.menu.showing)
                    this.menu.showing = false;
                else
                    this.hide();
            });

    }

    isHidden(): boolean {

        return this.menu.hidden;

    }

    hide(): MenuButton {

        if (this.menu.autoClose)
            document.removeEventListener('click', this);

        this.menu.hidden = true;
        this.view.invalidate();
        return this;

    }

    show(): MenuButton {

        this.menu.hidden = false;
        this.menu.showing = true;
        this.view.invalidate();

        if (this.menu.autoClose)
            document.addEventListener('click', this);

        return this;

    }

    toggle(): MenuButton {

        return this.menu.hidden ? this.show() : this.hide();

    }
}
