import * as wml from '@quenk/wml';
export interface IconAttrs extends wml.Attrs {
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
        root: {
            class: string;
        };
    };
}
