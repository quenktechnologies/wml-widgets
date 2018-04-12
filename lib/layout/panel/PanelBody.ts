import { View } from '@quenk/wml';
import { concat } from '../../util';
import { Main } from './wml/panel-body';
import { GenericLayout } from '../';
import { PANEL_BODY, PanelBodyAttrs } from '.';

/**
 * PanelBody part of a Panel for containing the main content.
 */
export class PanelBody extends GenericLayout<PanelBodyAttrs> {

    view: View = new Main(this);

    /**
     * values
     */
    values = {

        content: {

            id: 'body',

            /**
             * class for the root element.
             */
            class: concat(PANEL_BODY, this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
