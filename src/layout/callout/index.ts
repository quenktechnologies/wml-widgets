import { View, Component } from '@quenk/wml';
import { DEFAULT, Style, getStyleClassName } from '../../content/style';
import { concat } from '../../util';
import { HTMLElementAttrs, WidgetAttrs, getId, getClassName } from '../../';
import { Main } from './wml/callout';

export { Style }

///classNames:begin
export const CALLOUT = 'ww-callout';
///classNames:end

/**
 * CalloutAttrs
 */
export interface CalloutAttrs extends HTMLElementAttrs {

    /**
     * style
     */
    style: Style

}

/**
 * Callout 
 */
export class Callout extends Component<WidgetAttrs<CalloutAttrs>> {

    view: View = new Main(this);

    values = {

        id: getId(this.attrs),

        className: concat(CALLOUT,
            getClassName(this.attrs),

            (this.attrs.ww && this.attrs.ww.style) ?
                getStyleClassName(this.attrs.ww.style) :
                DEFAULT)

    }

}
