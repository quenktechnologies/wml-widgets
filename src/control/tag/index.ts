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
export interface TagAttrs<V> extends ControlAttrs<V> {

    /**
     * style of the tag.
     */
    style?: Style,

    /**
     * text to display for the tag.
     */
    text?: string

    /**
     * onDismiss is applied when the user clicks the close
     * button on tag.
     */
    onDismiss?: (e: DismissEvent<V>) => void

}

/**
 * DismissEvent is generated when the close button us clicked.
 */
export class DismissEvent<V> extends Event<V> { }

/**
 * Tag displays some text in a dismissable tag.
 *
 * The difference between this Tag and the one from the content
 * module is that this one is primarily meant to be used as a control
 * or as part of a more complicated control.
 */
export class Tag<V> extends AbstractControl<V, TagAttrs<V>> {

    view: View = new Main(this);

    values = {

        id: getId(this.attrs),

        className: concat(TAG_CONTROL, getClassName(this.attrs)),

        style: (this.attrs.ww && this.attrs.ww.style) ?
            this.attrs.ww.style : Style.Default,

        text: {

            className: TAG_CONTROL_TEXT,

            value: (this.attrs.ww && this.attrs.ww.text) ?
                this.attrs.ww.text : undefined,

        },
        dismiss: {

            className: TAG_CONTROL_DISMISS,

            onClick: () => {

                if (this.attrs.ww &&
                    this.attrs.ww.onDismiss &&
                    this.attrs.ww.value)
                    this.attrs.ww.onDismiss(new DismissEvent(
                        this.attrs.ww && this.attrs.ww.name || '',
                        this.attrs.ww.value));

            }

        }

    }

}
