import * as wml from '@quenk/wml';
import * as views from './wml/button-group';
import { concat } from '../../util';
import { TOOLBAR_COMPAT } from '../toolbar';
import { ButtonGroupAttrs } from '.';

///classNames:begin
export const BUTTON_GROUP = 'ww-button-group';
///classNames:end

/**
 * ButtonGroup groups multiple buttons into one element.
 */
export class ButtonGroup extends wml.Component<ButtonGroupAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        root: {

            class: concat(BUTTON_GROUP, TOOLBAR_COMPAT, (this.attrs.ww) ?
                this.attrs.ww.class : '')

        }

    }

}
