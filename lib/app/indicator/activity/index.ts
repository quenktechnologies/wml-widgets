import * as wml from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../../../';
import { Main } from './wml/activity-indicator';
import { concat } from '../../../util';

///classNames:begin
export const ACTIVITY_INDICATOR = 'ww-activity-indicator';
///classNames:end

/**
 * ActivityIndicator
 */
export interface ActivityIndicator extends StylableAttrs { }

/**
 * Busy provides a css driven animation that indicates
 * some action or activity is being carried out.
 */
export class ActivityIndicator extends wml.Component<WidgetAttrs<ActivityIndicator>> {

    view: wml.View = new Main(this);

    values = {

        root: {
            class: concat(ACTIVITY_INDICATOR, this.attrs.ww ? this.attrs.ww.class : '')
        }

    }

}
