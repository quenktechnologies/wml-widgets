import { Component, Attrs, View } from '@quenk/wml';
export interface IconButtonAttrs extends Attrs {
    ww?: {
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
            onClick: (e: Event) => void;
        };
    };
}
