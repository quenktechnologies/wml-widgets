import { Component, Attrs, View } from '@quenk/wml';
export interface IconButtonAttrs extends Attrs {
    ww?: {
        class?: string;
        /**
         * onClick is called when the user clicks on the menu button.
         */
        onClick?: (e: Event) => void;
    };
}
/**
 * IconButton provides a 'hamburger' menu button.
 */
export declare class IconButton extends Component<IconButtonAttrs> {
    view: View;
    values: {
        class: {
            root: string;
        };
        button: {
            class: string;
            onClick: (e: Event) => void;
        };
    };
}
