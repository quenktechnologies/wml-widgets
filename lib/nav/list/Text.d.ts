import * as wml from '@quenk/wml';
export interface TextAttrs extends wml.Attrs {
    ww?: {
        class?: string;
        text?: string;
    };
}
/**
 * Text can be used to display non-clickable heading text in a nav list.
 */
export declare class Text extends wml.Component<TextAttrs> {
    view: wml.View;
    values: {
        class: {
            root: string;
        };
        text: string;
    };
}
