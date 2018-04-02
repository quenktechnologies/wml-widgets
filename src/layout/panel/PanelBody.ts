import * as wml from '@quenk/wml';
import { Component } from '@quenk/wml';
import { WidgetAttrs } from '../..';
import { concat } from '../../util';
import { Main } from './wml/panel-body';
import { PANEL_BODY, PanelBodyAttrs } from '.';

/**
 * PanelBody part of a Panel for containing the main content.
 */
export class PanelBody extends Component<WidgetAttrs<PanelBodyAttrs>> {

    view: wml.View = new Main(this);

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
            class: concat(PANEL_BODY, this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
