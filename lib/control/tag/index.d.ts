import { View } from '@quenk/wml';
import { Style } from '../../content/style';
import { ControlAttrs, AbstractControl, Event } from '../';
export declare const TAG_CONTROL = "ww-tag-control";
export declare const TAG_CONTROL_TEXT = "ww-tag-control__text";
export declare const TAG_CONTROL_DISMISS = "ww-tag-control__dismiss";
/**
 * TagAttrs
 */
export interface TagAttrs extends ControlAttrs<void> {
    /**
     * style of the tag.
     */
    style?: Style;
    /**
     * disabled
     */
    disabled?: boolean;
    /**
     * text to display for the tag.
     */
    text?: string;
    /**
     * onDismiss is applied when the user clicks the close
     * button on tag.
     */
    onDismiss?: (e: DismissEvent) => void;
}
/**
 * DismissEvent is generated when the close button us clicked.
 */
export declare class DismissEvent extends Event<void> {
    name: string;
    constructor(name: string);
}
/**
 * Tag displays some text in a dismissable tag.
 *
 * The difference between this Tag and the one from the content
 * module is that this one is primarily meant to be used as a control
 * or as part of a more complicated control.
 */
export declare class Tag extends AbstractControl<void, TagAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
        style: Style;
        disabled: boolean;
        text: {
            className: string;
            value: string | undefined;
        };
        dismiss: {
            className: string;
            onClick: () => void;
        };
    };
}
