import * as wml from '@quenk/wml';
import * as names from './classNames';
import { Component } from '@quenk/wml';
import { concat } from '../../util';
import {WidgetAttrs} from '../..';
import { Main } from './wml/panel-footer';
import { PanelFooterAttrs } from '.';

/**
 * PanelFooter part of the panel for summary content etc.
 */
export class PanelFooter extends Component<WidgetAttrs<PanelFooterAttrs>> {

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
            class: concat(names.PANEL_FOOTER, this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
