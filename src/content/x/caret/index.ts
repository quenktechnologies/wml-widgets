import * as views from './wml/caret';
import { View, Component } from '@quenk/wml';
import { StylableAttrs, WidgetAttrs } from '../../../';
import {concat} from '../../../util';

///classNames:begin
export const CARET = 'ww-caret';
///classNames:end

/**
 * CaretAttrs
 */
export interface CaretAttrs extends StylableAttrs { }

export class Caret extends Component<WidgetAttrs<CaretAttrs>> {

    view: View = new views.Main(this);

  values ={

    root: {

      class: concat(CARET, this.attrs.ww && this.attrs.ww.class)

    }

  }

}
