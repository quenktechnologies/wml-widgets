import * as wml from '@quenk/wml';
import { Main } from './wml/busy_indicator';
import { StylableAttrs } from '../../content';
import { concat } from '../../common/util';

/**
 * BusyIndicator provides a 'hamburger' menu button.
 */
export class BusyIndicator extends wml.Component<StylableAttrs> {

    view: wml.View = new Main(this);

    values = {

        class: concat('loading', this.attrs.ww ? this.attrs.ww.class : '')

    }

}
