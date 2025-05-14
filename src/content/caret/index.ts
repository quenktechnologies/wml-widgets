import * as views from './wml/caret';
import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { HTMLElementAttrs } from '../../';

///classNames:begin
export const CARET = 'ww-caret';
///classNames:end

/**
 * CaretAttrs
 */
export interface CaretAttrs extends HTMLElementAttrs {}

/**
 * Caret
 */
export class Caret extends Component<CaretAttrs> {
    view: View = new views.Main(this);

    values = {
        root: {
            id: this.attrs && this.attrs.id ? this.attrs.id : '',

            className: concat(
                CARET,
                this.attrs && this.attrs.className ? this.attrs.className : ''
            )
        }
    };
}
