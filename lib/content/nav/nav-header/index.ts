import * as wml from '@quenk/wml';
import * as views from './wml/nav-header';
import { concat } from '../../../util';
import { WidgetAttrs, StylableAttrs } from '../../..';

///classNames:begin
/**
 * NAV_HEADER
 */
export const NAV_HEADER = 'ww-nav-header';
///classNames:end

/**
 * NavHeaderAttrs
 */
export interface NavHeaderAttrs extends StylableAttrs {

    /**
     * text allows the text of the header to be specified.
     */
    text?: string

}

/**
 * NavHeader can be used to display non-clickable heading text in a nav list.
 */
export class NavHeader extends wml.Component<WidgetAttrs<NavHeaderAttrs>> {

    view: wml.View = new views.Main(this);

    values = {

        item: {

            class: ''

        },
        span: {

            class: concat(NAV_HEADER,
                this.attrs.ww ? this.attrs.ww.class : '')

        },
        text: (this.attrs.ww && this.attrs.ww.text) ?
            this.attrs.ww.text : null

    }

}
