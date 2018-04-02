import { Component, Attrs, View } from '@quenk/wml';
import { Control, ControlAttrsProperties, Event } from '../';
/**
 * ICON_BUTTON clasess for IconButtons.
 */
export declare const ICON_BUTTON = "ww-icon-button";
/**
 * IconButtonAttrsProperties
 */
export interface IconButtonAttrsProperties extends ControlAttrsProperties {
    /**
     * onClick is called when the user clicks on the menu button.
     */
    onClick?: (e: Event<void>) => void;
}
/**
 * IconButtonAttrs
 */
export interface IconButtonAttrs extends Attrs {
    ww: IconButtonAttrsProperties;
}
/**
 * IconButtonClickedEvent triggered when an icon button is clicked.
 */
export declare class IconButtonClickedEvent extends Event<void> {
}
/**
 * IconButton provides a button with limited styling that displays
 * an icon for its UI.
 *
 *  +---------+
 *  | <= * => |
 *  +---------+
 */
export declare class IconButton extends Component<IconButtonAttrs> implements Control<IconButtonAttrs> {
    view: View;
    values: {
        class: {
            root: string;
        };
        button: {
            class: string;
            onClick: () => void;
        };
    };
}
