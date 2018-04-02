import * as wml from '@quenk/wml';
import * as names from './classNames';
import { Component } from '@quenk/wml';
import { WidgetAttrs } from '../..';
import { concat } from '../../util';
import { Main } from './wml/panel-body';
import { PanelBodyAttrs } from '.';

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
            class: concat(names.PANEL_BODY, this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
