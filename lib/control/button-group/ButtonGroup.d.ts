import * as wml from '@quenk/wml';
import { ButtonGroupAttrs } from '.';
export declare const BUTTON_GROUP = "ww-button-group";
/**
 * ButtonGroup groups multiple buttons into one element.
 */
export declare class ButtonGroup extends wml.Component<ButtonGroupAttrs> {
    view: wml.View;
    values: {
        root: {
            class: string;
        };
    };
}
