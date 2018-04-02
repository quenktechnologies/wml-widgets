import * as wml from '@quenk/wml';
export interface BusyIndicatorAttrs extends wml.Attrs {
    ww: {
        /**
         * class name to append to the root element.
         */
        class?: string;
    };
}
/**
 * BusyIndicator provides a 'hamburger' menu button.
 */
export declare class BusyIndicator extends wml.Component<BusyIndicatorAttrs> {
    view: wml.View;
    values: {
        class: string;
    };
}
