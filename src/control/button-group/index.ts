import * as views from './wml/button-group';
import { View, Content, Component } from '@quenk/wml';
import { concat } from '../../util';
import { TOOLBAR_COMPAT } from '../toolbar';
import { WidgetAttrs, HTMLElementAttrs, getId, getClassName } from '../../';

///classNames:begin
export const BUTTON_GROUP = 'ww-button-group';
export const BUTTON_GROUP_BUTTON = 'ww-button-group__button';
export const BUTTON_GROUP_COMPAT = 'ww-button-group-compat';
///classNames:end

/**
 * ButtonGroupAttrs 
 */
export interface ButtonGroupAttrs extends HTMLElementAttrs {

    /**
   * content can be specified instead of the children attribute.
   */
    content?: Content[]

}

/**
 * ButtonGroup groups multiple buttons into one element.
 */
export class ButtonGroup extends Component<WidgetAttrs<ButtonGroupAttrs>> {

    view: View = new views.Main(this);

    values = {

        root: {

            id: getId(this.attrs),

            className: concat(BUTTON_GROUP, TOOLBAR_COMPAT,
                getClassName(this.attrs))

        }

    }

}
