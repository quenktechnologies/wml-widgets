import * as wml from '@quenk/wml';
import * as views from './wml/horizontal-layout';
import { concat } from '../../util';
import { WidgetAttrs, StylableAttrs } from '../../';

///classNames:begin
export const HORIZONTAL_LAYOUT = 'ww-horizontal-layout';
///classNames:end

/**
 * HorizontalLayoutAttrs
 */
export interface HorizontalLayoutAttrs extends StylableAttrs { }

/**
 * HorizontalLayout uses the css flexbox to provide a container
 * where all items are laid out in a single row.
 */
export class HorizontalLayout extends
    wml.Component<WidgetAttrs<HorizontalLayoutAttrs>> {

    view: wml.View = new views.Main(this);

    /**
     * values
     */
    values = {

        /**
         * root element values.
         */
        root: {

            /**
             * class names of the root element.
             */
            class: concat(HORIZONTAL_LAYOUT)

        }

    }

}
