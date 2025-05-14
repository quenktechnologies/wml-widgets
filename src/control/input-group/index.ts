import { View, Component } from '@quenk/wml';

import { concat } from '../../util';
import { getClassName, getId, HTMLElementAttrs } from '../../';
import { InputGroupView, AddOnView } from './wml/input-group';

///classNames:begin
export const INPUT_GROUP = 'ww-input-group';
export const INPUT_GROUP_ADDON = 'ww-input-group__addon';
export const INPUT_GROUP_BUTTON_ADDON = 'ww-input-group__button-addon';
///classNames:end

/**
 * InputGroupAttrs
 */
export interface InputGroupAttrs extends HTMLElementAttrs {}

/**
 * InputGroup allows an input to be wrapped together with other controls to
 * appear as one.
 *
 * This is useful for creating inputs that may have related fields that should
 * be modified when changed. For example, entering an amount and currency in the
 * same place.
 *
 *  +--------------------------------+
 *  | TTD ^ | 5000.00                |
 *  +--------------------------------+
 */
export class InputGroup extends Component<InputGroupAttrs> {
    view: View = new InputGroupView(this);

    values = {
        id: getId(this.attrs),

        className: concat(INPUT_GROUP, getClassName(this.attrs))
    };
}

/**
 * AddOnAttrs
 */
export interface AddOnAttrs extends HTMLElementAttrs {
    /**
     * button if true, will use the css classes for button addons.
     */
    button?: boolean;
}

/**
 * AddOn is used to attach the extra text or control to the input.
 */
export class AddOn extends Component<AddOnAttrs> {
    view: View = new AddOnView(this);

    values = {
        id: getId(this.attrs),

        className: concat(
            this.attrs.button ? INPUT_GROUP_BUTTON_ADDON : INPUT_GROUP_ADDON,
            getClassName(this.attrs)
        )
    };
}
