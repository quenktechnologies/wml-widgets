import { View, Component } from '@quenk/wml';
import { DEFAULT, Style, getStyleClassName } from '../../content/style';
import { concat } from '../../util';
import { HTMLElementAttrs, WidgetAttrs, getClassName, getId, text } from '../../';
import { Main } from './wml/tag';

export { Style }

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
    text?: string

    /**
     * style to apply to the tag.
     */
    style?: Style,

    /**
     * onClick handler.
     */
    onClick?: () => void

}

/**
 * Tag
 */
export class Tag extends Component<WidgetAttrs<TagAttrs>> {

    view: View = new Main(this);

    values = {

        wml: {

            id: 'tag'

        },

        id: getId(this.attrs),

        className: concat(TAG,

            getClassName(this.attrs),

            (this.attrs.ww && this.attrs.ww.style) ?
                getStyleClassName(this.attrs.ww.style) :
                DEFAULT),

        onclick: (_: Event) => {

            if (this.attrs.ww && this.attrs.ww.onClick)
                this.attrs.ww.onClick()

        },

        content: (this.attrs.ww && this.attrs.ww.text) ?
            [text(this.attrs.ww.text)] : this.children

    }

}
