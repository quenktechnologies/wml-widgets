import { View, Component } from '@quenk/wml';
import { TOOLBAR_COMPAT } from '../toolbar';
import { BLOCK } from '../../content/orientation';
import { DISABLED } from '../../content/state/disabled';
import { DEFAULT, Style, getStyleClassName } from '../../content/style';
import { Size, getSizeClassName } from '../../content/size';
import { concat } from '../../util';
import { getClassName, getId, HTMLElementAttrs,  } from '../../';
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
     * disabled
     */
    disabled?: boolean,

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
    Component<DisplayFieldAttrs> {

    view: View = new Main(this);

    values = {

        wml: {

            id: 'display'

        },

        id: getId(this.attrs),

        disabled: (this.attrs && this.attrs.disabled) ?
            this.attrs.disabled : false,

        className: concat(DISPLAY_FIELD,

            getClassName(this.attrs),

            TOOLBAR_COMPAT,

            (this.attrs && this.attrs.style) ?
                getStyleClassName(this.attrs.style) :
                DEFAULT,

            (this.attrs && this.attrs.size) ?
                getSizeClassName(this.attrs.size) : '',

            (this.attrs && this.attrs.block) ?
                BLOCK : '',

            (this.attrs && this.attrs.disabled) ?
                DISABLED : ''),

        onclick: (e: Event) => {

            e.stopPropagation(); //prevent a bug when used with ResultsMenu

            if (this.attrs &&
                this.attrs.onClick &&
                (!this.values.disabled))
                this.attrs.onClick();

        },

        content: {

            className: DISPLAY_FIELD_CONTENT

        }

    };

}
