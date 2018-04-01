import * as wml from '@quenk/wml';
import { Main } from './wml/busy_indicator';
import { concat } from '../../util';

export interface BusyIndicatorAttrs extends wml.Attrs {

    ww: {

        /**
         * class name to append to the root element.
         */
        class?: string
    }

}

/**
 * BusyIndicator provides a 'hamburger' menu button.
 */
export class BusyIndicator extends wml.Component<BusyIndicatorAttrs> {

    view: wml.View = new Main(this);

    values = {

        class: concat('loading', this.attrs.ww ? this.attrs.ww.class : '')

    }

}
