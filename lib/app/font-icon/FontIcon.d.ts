import * as wml from '@quenk/wml';
import { StylableAttrs } from '@package/self/content';
export interface IconAttrs extends StylableAttrs {
    ww: {
        /**
         * classes for this font icon.
         */
        class: string;
    };
}
/**
 * FontIcon allows the usage of font icons.
 */
export declare class FontIcon extends wml.Component<IconAttrs> {
    view: wml.View;
    values: {
        class: string;
    };
}
