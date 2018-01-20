import * as wml from '@quenk/wml';
import * as names from '@package/self/common/names';
import * as views from './wml/panel';
import { Component } from '@quenk/wml';
import { concat } from '@package/self/common/util';
import { FooterAttrs } from '.';

/**
 * Footer part of the panel for summary content etc.
 */
export class Footer extends Component<FooterAttrs> {

    view: wml.View = new views.Footer(this);

    /**
     * values
     */
    values = {

       /**
        * root element values.
        */
        root: {
          
          /**
           * class name for the root element.
           */
          class: concat(names.PANEL_FOOTER, this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
