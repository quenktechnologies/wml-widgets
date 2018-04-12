import { View } from '@quenk/wml';
import { concat } from '../../util';
import { Main } from './wml/panel-header';
import { GenericLayout } from '../';
import { PANEL_HEADER, PanelHeaderAttrs } from '.';

export class PanelHeader extends GenericLayout<PanelHeaderAttrs> {

    view: View = new Main(this);

    /**
     * values
     */
    values = {

        content: {

            id: 'header',

            /**
             * class name for the root element.
             */
            class: concat(PANEL_HEADER, this.attrs.ww ? this.attrs.ww.class : '')

        }

    }

}
