import { mapTo, merge, Record } from '@quenk/noni/lib/data/record';
import { isFunction } from '@quenk/noni/lib/data/type';

import { Component } from '@quenk/wml';

import { concat } from '../../util';
import { TOOLBAR_COMPAT } from '../toolbar';
import { HTMLElementAttrs, getId, getClassName } from '../../';
import { MenuButtonAttrs } from '../menu-button';
import { ButtonAttrs, ButtonClickedEventHandler } from '../button';
import { ButtonGroupView } from './views';

///classNames:begin
export const BUTTON_GROUP = 'ww-button-group';
export const BUTTON_GROUP_BUTTON = 'ww-button-group__button';
export const BUTTON_GROUP_COMPAT = 'ww-button-group-compat';
///classNames:end

/**
 * ButtonTypes specifies a button or dropdown button to include in a button group.
 */
export type ButtonTypes = ButtonType | MenuButtonType;

/**
 * ButtonType defines a button for the button group.
 */
export interface ButtonType extends ButtonAttrs<void> {
    /**
     * type must be "button" to be considered valid.
     */
    type: string;
}

/**
 * MenuButtonType defines a dropdown for the button group.
 */
export interface MenuButtonType extends MenuButtonAttrs {
    /**
     * type must be "menu" to be considered valid.
     */
    type: string;
}

/**
 * ButtonSpecRecord allows button group buttons to be specified as a record.
 *
 * The key is treated as the "name" property of the button and will be merged
 * in with the attribute definition (if any). The value can be a full button or
 * dropdown attribute definition or simply the onClick handler.
 */
export type ButtonSpecRecord = Record<
    ButtonTypes | ButtonClickedEventHandler<void>
>;

/**
 * ButtonGroupAttrs
 */
export interface ButtonGroupAttrs extends HTMLElementAttrs {
    /**
     * buttons specifies buttons to auto-generate for the button group.
     */
    buttons?: ButtonSpecRecord | ButtonTypes[];
}

/**
 * ButtonGroup groups multiple buttons into one element.
 */
export class ButtonGroup extends Component<ButtonGroupAttrs> {
    view = new ButtonGroupView(this);

    values = {
        id: getId(this.attrs),

        className: concat(
            BUTTON_GROUP,
            TOOLBAR_COMPAT,
            getClassName(this.attrs)
        ),

        buttons: normalize(this.attrs.buttons || [])
    };
}

const normalize = (specs: ButtonSpecRecord | ButtonTypes[]): ButtonTypes[] => {
    if (Array.isArray(specs)) return specs;
    else
        return mapTo(specs, (conf, name) => {
            if (isFunction(conf))
                return { type: 'button', name, onClick: conf };
            else return merge({ name }, conf);
        });
};
