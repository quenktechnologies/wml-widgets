import { View, Component } from '@quenk/wml';
import { TOOLBAR_COMPAT } from '../toolbar';
import { BLOCK } from '../../content/orientation';
import { DEFAULT, Style, getStyleClassName } from '../../content/style';
import { Size, getSizeClassName } from '../../content/size';
import { concat } from '../../util';
import { getClassName, getId, HTMLElementAttrs, WidgetAttrs } from '../../';
import { Main } from './wml/display-field';

export { Style }

///classNames:begin
export const DISPLAY_FIELD = 'ww-display-field';
export const DISPLAY_FIELD_CONTENT = 'ww-display-field__content';
///classNames:end

/**
 * DisplayFieldAttrs
 */
export interface DisplayFieldAttrs extends HTMLElementAttrs {

    /**
     * size modifier.
     */
    size?: Size,

    /**
     * style modifier.
     */
    style?: Style,

    /**
     * block scope this button.
     */
    block?: boolean,

    /**
     * onClick handler.
     */
    onClick?: () => void

};

/**
 * DisplayField is used to display a value in a text field like box.
 */
export class DisplayField
    extends
    Component<WidgetAttrs<DisplayFieldAttrs>> {

    view: View = new Main(this);

    values = {

        wml: {

            id: 'display'

        },

        id: getId(this.attrs),

        className: concat(DISPLAY_FIELD,

            getClassName(this.attrs),

            TOOLBAR_COMPAT,

            (this.attrs.ww && this.attrs.ww.style) ?
                getStyleClassName(this.attrs.ww.style) :
                DEFAULT,

            (this.attrs.ww && this.attrs.ww.size) ?
                getSizeClassName(this.attrs.ww.size) : '',

            (this.attrs.ww && this.attrs.ww.block) ?
                BLOCK : ''),

        onclick: (e: Event) => {

            e.stopPropagation(); //prevent a bug when used with ResultsMenu

            if (this.attrs.ww && this.attrs.ww.onClick)
                this.attrs.ww.onClick();

        },

        content: {

            className: DISPLAY_FIELD_CONTENT

        }

    };

}
