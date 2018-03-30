import * as wml from '@quenk/wml';
import * as names from '../../common/names';
import * as views from './wml/header';
import {concat} from '../../common/util';

/**
 * HeaderAttrs 
 */
export interface HeaderAttrs extends wml.Attrs {

    ww?: {

        /**
         * class or classes to append to the root element.
         */
        class?: string,

        /**
         * text to display as an alternative to specifying children elements.
         */
        text?: string

    }

}

/**
 * Header is used to clearly separate headings from 
 * the rest of content.
 */
export class Header extends wml.Component<HeaderAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        class: {

            root: concat(names.HEADER, this.attrs.ww ? this.attrs.ww.class : '')

        },
        text: (this.attrs.ww && this.attrs.ww.text) ?
            this.attrs.ww.text : ''

    }

}
