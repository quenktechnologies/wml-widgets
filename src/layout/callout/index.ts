import { View, Component } from '@quenk/wml';
import { DEFAULT, Style, getStyleClassName } from '../../content/style';
import { concat } from '../../util';
import { HTMLElementAttrs, getId, getClassName } from '../../';
import { Main } from './wml/callout';

export { Style };

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
    style: Style;
}

/**
 * Callout
 */
export class Callout extends Component<CalloutAttrs> {
    view: View = new Main(this);

    values = {
        id: getId(this.attrs),

        className: concat(
            CALLOUT,
            getClassName(this.attrs),

            this.attrs && this.attrs.style
                ? getStyleClassName(this.attrs.style)
                : DEFAULT
        )
    };
}
