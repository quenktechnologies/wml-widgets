import * as views from './wml/close';
import { View, Component } from '@quenk/wml';
import {concat} from '../../../util';
import { StylableAttrs, WidgetAttrs } from '../../../';

///classNames:begin
export const CLOSE = 'ww-close';
///classNames:end

/**
 * CloseAttrs
 */
export interface CloseAttrs extends StylableAttrs { }

export class Close extends Component<WidgetAttrs<CloseAttrs>> {

    view: View = new views.Main(this);

    values = {

        root: {

            class: concat(this.attrs.ww.class, CLOSE)

        }

    }

}
