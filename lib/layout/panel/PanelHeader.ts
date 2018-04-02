import * as wml from '@quenk/wml';
import { Component } from '@quenk/wml';
import { concat } from '../../util';
import { WidgetAttrs } from '../..';
import { Main } from './wml/panel-header';
import { PANEL_HEADER, PanelHeaderAttrs } from '.';

export class PanelHeader extends Component<WidgetAttrs<PanelHeaderAttrs>> {

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
             * class name for the root element.
             */
            class: concat(PANEL_HEADER, this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
