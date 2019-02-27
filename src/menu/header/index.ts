import * as wml from '@quenk/wml';
import * as views from './wml/header';
import { concat } from '../../util';
import { WidgetAttrs, HTMLElementAttrs } from '../../';

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
export class MenuHeader extends wml.Component<WidgetAttrs<MenuHeaderAttrs>> {

    view: wml.View = new views.Main(this);

    values = {

        span: {

            id: (this.attrs.ww && this.attrs.ww.id) ? this.attrs.ww.id : '',

            className: concat(MENU_HEADER,
                (this.attrs.ww && this.attrs.ww.className) ?
                    this.attrs.ww.className : '')

        },
      text: (this.attrs.ww && this.attrs.ww.text) ?
      [document.createTextNode(this.attrs.ww.text)] : this.children

    }

}
