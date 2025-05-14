import { text } from '@quenk/wml/lib/dom';
import { View, Component } from '@quenk/wml';
import { DEFAULT, Style, getStyleClassName } from '../../content/style';
import { concat } from '../../util';
import { HTMLElementAttrs, getClassName, getId } from '../../';
import { Main } from './wml/tag';

export { Style };

///classNames:begin
export const TAG = 'ww-tag';
///classNames:end

/**
 * TagAttrs
 */
export interface TagAttrs extends HTMLElementAttrs {
    /**
     * text to display in the tag.
     */
    text?: string;

    /**
     * style to apply to the tag.
     */
    style?: Style;

    /**
     * onClick handler.
     */
    onClick?: () => void;
}

/**
 * Tag
 */
export class Tag extends Component<TagAttrs> {
    view: View = new Main(this);

    values = {
        wml: {
            id: 'tag'
        },

        id: getId(this.attrs),

        className: concat(
            TAG,

            getClassName(this.attrs),

            this.attrs && this.attrs.style
                ? getStyleClassName(this.attrs.style)
                : DEFAULT
        ),

        onclick: (_: Event) => {
            if (this.attrs && this.attrs.onClick) this.attrs.onClick();
        },

        content:
            this.attrs && this.attrs.text
                ? [text(this.attrs.text)]
                : this.children
    };
}
