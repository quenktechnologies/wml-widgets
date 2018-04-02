import * as wml from '@quenk/wml';
import * as names from './classNames';
import { Component } from '@quenk/wml';
import { concat } from '../../util';
import {WidgetAttrs} from '../..';
import { Main } from './wml/panel-header';
import { PanelHeaderAttrs } from '.';

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
            class: concat(names.PANEL_HEADER, this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
