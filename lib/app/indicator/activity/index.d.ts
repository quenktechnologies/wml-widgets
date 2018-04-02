import * as wml from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../../../';
export declare const ACTIVITY_INDICATOR = "ww-activity-indicator";
/**
 * ActivityIndicator
 */
export interface ActivityIndicator extends StylableAttrs {
}
/**
 * Busy provides a css driven animation that indicates
 * some action or activity is being carried out.
 */
export declare class ActivityIndicator extends wml.Component<WidgetAttrs<ActivityIndicator>> {
    view: wml.View;
    values: {
        root: {
            class: string;
        };
    };
}
