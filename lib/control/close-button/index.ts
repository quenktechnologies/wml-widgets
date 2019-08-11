import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { getClassName, getId, HTMLElementAttrs, WidgetAttrs } from '../../';
import { Main } from './wml/close-button';

///classNames:begin
export const CLOSE_BUTTON = 'ww-close-button';
///classNames:end

/**
 * CloseButtonAttrs
 */
export interface CloseButtonAttrs extends HTMLElementAttrs {

    /**
     * onClick handler.
     */
    onClick?: () => void

};

/**
 * CloseButton used to display the "x" on dialogs etc.
 */
export class CloseButton extends Component<WidgetAttrs<CloseButtonAttrs>> {

    view: View = new Main(this);

    values = {

        id: getId(this.attrs),

        className: concat(CLOSE_BUTTON, getClassName(this.attrs)),

        wml: {

            id: 'close-button'

        },

        onclick: () => {

            if (this.attrs.ww && this.attrs.ww.onClick)
                this.attrs.ww.onClick();

        }

    };

}
