import * as views from './wml/close';
import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { HTMLElementAttrs, WidgetAttrs } from '../../';

///classNames:begin
export const CLOSE = 'ww-close';
///classNames:end

/**
 * CloseAttrs
 */
export interface CloseAttrs extends HTMLElementAttrs {

    /**
     * onClick handler
     */
    onClick: () => void

}

/**
 * Close
 */
export class Close extends Component<WidgetAttrs<CloseAttrs>> {

    view: View = new views.Main(this);

    values = {

        id: (this.attrs.ww && this.attrs.ww.id) ?
            this.attrs.ww.id : '',

        className: concat(CLOSE, (this.attrs.ww && this.attrs.ww.className) ?
            this.attrs.ww.className : ''),

        onClick: (this.attrs.ww && this.attrs.ww.onClick) ?
            this.attrs.ww.onClick : () => { }

    }

}
