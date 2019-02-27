import * as views from './wml/caret';
import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { HTMLElementAttrs, WidgetAttrs } from '../../';

///classNames:begin
export const CARET = 'ww-caret';
///classNames:end

/**
 * CaretAttrs
 */
export interface CaretAttrs extends HTMLElementAttrs { }

/**
 * Caret
 */
export class Caret extends Component<WidgetAttrs<CaretAttrs>> {

    view: View = new views.Main(this);

    values = {

        root: {

            id: (this.attrs.ww && this.attrs.ww.id) ? this.attrs.ww.id : '',

            className: concat(CARET, (this.attrs.ww && this.attrs.ww.className) ?
                this.attrs.ww.className : '')

        }

    }

}
