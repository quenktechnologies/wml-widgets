import * as views from './wml/breadcrumb';

import { Component, View } from '@quenk/wml';

import { concat } from '../../util';
import { HTMLElementAttrs } from '../../';

///classNames:begin
export const BREADCRUMB_MENU = 'ww-breadcrumb-menu';
///classNames:end

export { Item } from '../item';
export { Link } from '../../content/link';

/**
 * Breadcrumb
 */
export interface BreadcrumbAttrs extends HTMLElementAttrs {}

/**
 * BreadcrumbMenu
 */
export class BreadcrumbMenu extends Component<BreadcrumbAttrs> {
    view: View = new views.Main(this);

    values = {
        root: {
            id: this.attrs && this.attrs.id ? this.attrs.id : '',

            className: concat(
                BREADCRUMB_MENU,
                this.attrs && this.attrs.className ? this.attrs.className : ''
            )
        }
    };
}
