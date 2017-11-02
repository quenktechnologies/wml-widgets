import * as wml from '@quenk/wml';
import { Main } from './wml/icon';
export declare type Size = 'lg' | '2x' | '3x' | '4x' | '5x';
export declare enum Sizes {
    LG = "lg",
    TWO = "2x",
    THREE = "3x",
    FOUR = "4x",
    FIVE = "5x",
}
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
    view: Main;
    values: {
        class: string;
    };
}
