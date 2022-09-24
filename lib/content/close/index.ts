import * as views from './wml/close';
import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { HTMLElementAttrs,  } from '../../';

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
    onClick?: () => void

}

/**
 * Close
 */
export class Close extends Component<CloseAttrs> {

    view: View = new views.Main(this);

    values = {

        id: (this.attrs && this.attrs.id) ?
            this.attrs.id : '',

        className: concat(CLOSE, (this.attrs && this.attrs.className) ?
            this.attrs.className : ''),

        onClick: (this.attrs && this.attrs.onClick) ?
            this.attrs.onClick : () => { }

    }

}
