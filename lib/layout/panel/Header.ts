import * as wml from '@quenk/wml';
import * as names from '@package/wml-widgets/common/names';
import * as views from './wml/panel';
import { Component } from '@quenk/wml';
import { concat } from '@package/wml-widgets/common/util';
import { HeaderAttrs } from '.';

export class Header extends Component<HeaderAttrs> {

    view: wml.View = new views.Header(this);

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
            class: concat(names.PANEL_HEADER, this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
