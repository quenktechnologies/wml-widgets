import * as wml from '@quenk/wml';
import * as views from './wml/horizontal';
import { concat } from '../../util';
import { WidgetAttrs, HTMLElementAttrs } from '../../';

///classNames:begin
export const HORIZONTAL_LAYOUT = 'ww-horizontal-layout';
///classNames:end

/**
 * HorizontalLayoutAttrs
 */
export interface HorizontalLayoutAttrs extends HTMLElementAttrs { }

/**
 * HorizontalLayout uses the css flexbox to provide a container
 * where all items are laid out in a single row.
 */
export class HorizontalLayout extends
    wml.Component<WidgetAttrs<HorizontalLayoutAttrs>> {

    view: wml.View = new views.Main(this);

    values = {

        root: {

            id: (this.attrs.ww && this.attrs.ww.id) ? this.attrs.ww.id : '',

            className: concat(HORIZONTAL_LAYOUT,
                (this.attrs.ww && this.attrs.ww.className) ?
                    this.attrs.ww.className : '')

        }

    }

}
