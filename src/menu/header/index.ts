import * as wml from '@quenk/wml';
import * as document from '@quenk/wml/lib/dom';
import * as views from './wml/header';

import { concat } from '../../util';
import { HTMLElementAttrs } from '../../';

///classNames:begin
/**
 * MENU_HEADER
 */
export const MENU_HEADER = 'ww-menu-header';
///classNames:end

/**
 * MenuHeaderAttrs
 */
export interface MenuHeaderAttrs extends HTMLElementAttrs {

    /**
     * text allows the text of the header to be specified.
     */
    text?: string

}

/**
 * MenuHeader can be used to display non-clickable heading text in a nav menu.
 */
export class MenuHeader extends wml.Component<MenuHeaderAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        span: {

            id: (this.attrs && this.attrs.id) ? this.attrs.id : '',

            className: concat(MENU_HEADER,
                (this.attrs && this.attrs.className) ?
                    this.attrs.className : '')

        },
        text: (this.attrs && this.attrs.text) ?
            [document.createTextNode(this.attrs.text)] : this.children

    }

}
