import { View } from '@quenk/wml';
import { concat } from '../../util';
import { Main } from './wml/panel-footer';
import {LAYOUT, GenericLayout} from '../';
import { PANEL_FOOTER, PanelFooterAttrs } from '.';

/**
 * PanelFooter part of the panel for summary content etc.
 */
export class PanelFooter extends GenericLayout<PanelFooterAttrs> {

    view: View = new Main(this);

    /**
     * values
     */
    values = {

        content: {

      id: 'footer',
            /**
             * class name for the root element.
             */
            class: concat(PANEL_FOOTER, LAYOUT,this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
