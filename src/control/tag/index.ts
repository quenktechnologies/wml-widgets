import { View } from '@quenk/wml';
import { Style } from '../../content/style';
import { concat } from '../../util';
import { getId, getClassName } from '../../';
import { ControlAttrs, AbstractControl, Event } from '../';
import { Main } from './wml/tag';

///classNames:begin
export const TAG_CONTROL = 'ww-tag-control';
export const TAG_CONTROL_TEXT = 'ww-tag-control__text';
export const TAG_CONTROL_DISMISS = 'ww-tag-control__dismiss';
///classNames:end

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
export class DismissEvent extends Event<void> {
    constructor(public name: string) {
        super(name, undefined);
    }
}

/**
 * Tag displays some text in a dismissable tag.
 *
 * The difference between this Tag and the one from the content
 * module is that this one is primarily meant to be used as a control
 * or as part of a more complicated control.
 */
export class Tag extends AbstractControl<void, TagAttrs> {
    view: View = new Main(this);

    values = {
        id: getId(this.attrs),

        className: concat(TAG_CONTROL, getClassName(this.attrs)),

        style:
            this.attrs && this.attrs.style ? this.attrs.style : Style.Default,

        disabled:
            this.attrs && this.attrs.disabled ? this.attrs.disabled : false,

        text: {
            className: TAG_CONTROL_TEXT,

            value: this.attrs && this.attrs.text ? this.attrs.text : undefined
        },
        dismiss: {
            className: TAG_CONTROL_DISMISS,

            onClick: () => {
                if (this.attrs && this.attrs.onDismiss)
                    this.attrs.onDismiss(
                        new DismissEvent((this.attrs && this.attrs.name) || '')
                    );
            }
        }
    };
}
