import * as wml from '@quenk/wml';
import * as util from '../../util';
import * as views from './wml/nav';
import { VERTICAL } from '../../content/orientation';
import { WidgetAttrs, HTMLElementAttrs } from '../../';

export { Item } from '../item';
export { Link } from '../../content/link';

///classNames:begin
/**
 * NAV
 */
export const NAV = 'ww-nav';
///classNames:end

/**
 * NavAttrs
 */
export interface NavAttrs extends HTMLElementAttrs {

    /**
     * vertical indicates whether to display the nav
     * vertically or horizontally (default).
     */
    vertical?: boolean

}

/**
 * Nav provides styling for displaying a list of anchor links.
 */
export class Nav extends wml.Component<WidgetAttrs<NavAttrs>> {

    view: wml.View = new views.Main(this);

    values = {

      root: {

        id: (this.attrs.ww && this.attrs.ww.id) ? this.attrs.ww.id : '',

            className: util.concat(NAV,
                (this.attrs.ww && this.attrs.ww.className) ?
                    this.attrs.ww.className : '',
                (this.attrs.ww && this.attrs.ww.vertical) ?
                    VERTICAL : '')

        }

    }

}
