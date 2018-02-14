import * as wml from '@quenk/wml';
import * as names from '@package/wml-widgets/common/names';
import * as views from './wml/panel';
import { Component } from '@quenk/wml';
import { concat } from '@package/wml-widgets/common/util';
import { BodyAttrs } from '.';

/**
 * Body part of a Panel for containing the main content.
 */
export class Body extends Component<BodyAttrs> {

    view: wml.View = new views.Body(this);

    /**
     * values
     */
    values = {

        /**
         * root element values.
         */
        root: {

            /**
             * class for the root element.
             */
            class: concat(names.PANEL_BODY, this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
