import * as hidden from '../../content/state/hidden';
import * as style from '../../content/style';

import { Component } from '@quenk/wml';

import { BUTTON_GROUP_COMPAT } from '../button-group';
import { concat, getById } from '../../util';
import { HTMLElementAttrs, getId, getClassName } from '../../';
import { MenuItemSpec } from '../../menu/menu';
import { DropDownView } from './views';

///classNames:begin
export const DROP_DOWN = 'ww-drop-down-menu';
export const DROP_DOWN_TOGGLE = 'ww-drop-down-menu__toggle';
export const DROP_DOWN_CONTENT = 'ww-drop-down-menu';
///classNames:end

/**
 * DropDownAttrs
 */
export interface DropDownAttrs extends HTMLElementAttrs {

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
export class DropDown extends Component<DropDownAttrs>
    implements hidden.Hidable {

    view = new DropDownView(this);

    wmlId = 'root';

    id = getId(this.attrs);

    className = concat(DROP_DOWN, BUTTON_GROUP_COMPAT, getClassName(this.attrs));

    button = {

        text: this.attrs.text,

        anchor: this.attrs.anchor,

        className: concat(DROP_DOWN_TOGGLE, this.attrs.buttonClassName || style.DEFAULT),

        disabled: this.attrs.disabled,

        onClick: () => {

            this.toggle();

        }

    };

    menu = {

        wmlId: 'content',

        className: DROP_DOWN_CONTENT,

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

    hide(): DropDown {

        if (this.menu.autoClose)
            document.removeEventListener('click', this);

        this.menu.hidden = true;
        this.view.invalidate();
        return this;

    }

    show(): DropDown {

        this.menu.hidden = false;
        this.menu.showing = true;
        this.view.invalidate();

        if (this.menu.autoClose)
            document.addEventListener('click', this);

        return this;

    }

    toggle(): DropDown {

        return this.menu.hidden ? this.show() : this.hide();

    }
}
