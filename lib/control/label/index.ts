import * as document from '@quenk/wml/lib/dom';

import { View, Component } from '@quenk/wml';

import { concat } from '../../util';
import { getClassName, HTMLElementAttrs } from '../../';
import { Main } from './wml/label';

///classNames:begin
export const LABEL = 'ww-label';
///classNames:end

/**
 * LabelAttrs
 */
export interface LabelAttrs extends HTMLElementAttrs{

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
export class Label extends Component<LabelAttrs> {

    view: View = new Main(this);

    values = {

        label: {

            className: concat(LABEL, getClassName(this.attrs)),

            for: (this.attrs && this.attrs.for) ?
                this.attrs.for : '',

            text: (this.attrs && this.attrs.text) ?
                [document.createTextNode(this.attrs.text)] : this.children

        }

    }

}
