import * as wml from '@quenk/wml';
import * as views from './wml/button-group';
import * as names from '../../common/names';
import { concat } from '../../util';
import { ButtonGroupAttrs } from '.';

/**
 * ButtonGroup groups multiple buttons into one element.
 */
export class ButtonGroup extends wml.Component<ButtonGroupAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        root: {

            class: concat(names.BUTTON_GROUP, (this.attrs.ww) ? this.attrs.ww.class : '')

        }

    }

}
