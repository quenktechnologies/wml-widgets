import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { WidgetAttrs, getClassName } from '../../';
import { Main } from './wml/label';

///classNames:begin
export const LABEL = 'ww-label';
///classNames:end

/**
 * LabelAttrs
 */
export interface LabelAttrs {

    /**
     * for value
     */
    for?: string

    /**
     * className for the label.
     */
    className?: string,

    /**
     * text for the label.
     */
    text?: string

}

/**
 * Label
 */
export class Label extends Component<WidgetAttrs<LabelAttrs>> {

    view: View = new Main(this);

    values = {

        label: {

            className: concat(LABEL, getClassName(this.attrs)),

            for: (this.attrs.ww && this.attrs.ww.for) ?
                this.attrs.ww.for : '',

            text: (this.attrs.ww && this.attrs.ww.text) ?
                [document.createTextNode(this.attrs.ww.text)] : this.children

        }

    }

}
