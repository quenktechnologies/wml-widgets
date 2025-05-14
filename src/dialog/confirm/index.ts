import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { getId, getClassName, HTMLElementAttrs } from '../../';
import { close } from '../prompt';
import { Main } from './wml/confirm';

///classNames:begin
export const CONFIRM = 'ww-confirm';
export const CONFIRM_NO = 'ww-confirm__no';
export const CONFIRM_YES = 'ww-prompt__yes';
///classNames:end

/**
 * Primary indicates whether the yes or no button should be highlighted.
 */
export enum Primary {
    No = 'no',

    Yes = 'yes'
}

/**
 * ConfirmAttrs
 */
export interface ConfirmAttrs extends HTMLElementAttrs {
    /**
     * title of the confirm.
     */
    title?: string;

    /**
     * primary
     */
    primary?: Primary;

    /**
     * noText
     */
    noText?: string;

    /**
     * yesText
     */
    yesText?: string;

    /**
     * onYes handler.
     */
    onYes: () => void;

    /**
     * onNo handler.
     */
    onNo: () => void;
}

/**
 * Confirm displays a dialog for confirming an action.
 */
export class Confirm extends Component<ConfirmAttrs> {
    view: View = new Main(this);

    values = {
        id: getId(this.attrs),

        className: concat(CONFIRM, getClassName(this.attrs)),

        wml: {
            id: 'modal'
        },

        header: {
            title: this.attrs && this.attrs.title ? this.attrs.title : ''
        },
        footer: {
            no: {
                text:
                    this.attrs && this.attrs.noText ? this.attrs.noText : 'No',

                className: concat(
                    CONFIRM_NO,
                    this.attrs &&
                        this.attrs.primary &&
                        this.attrs.primary === Primary.No
                        ? '-primary'
                        : ''
                ),

                onClick: () => {
                    if (this.attrs && this.attrs.onNo) this.attrs.onNo();

                    this.close();
                }
            },

            yes: {
                text:
                    this.attrs && this.attrs.yesText
                        ? this.attrs.yesText
                        : 'Yes',

                wml: {
                    id: 'yes'
                },

                className: concat(
                    CONFIRM_YES,
                    this.attrs &&
                        this.attrs.primary &&
                        this.attrs.primary === Primary.No
                        ? ''
                        : '-primary'
                ),

                onClick: () => {
                    if (this.attrs && this.attrs.onYes) this.attrs.onYes();

                    this.close();
                }
            }
        }
    };

    close(): Confirm {
        close(this.view, this.values.wml.id);
        return this;
    }
}
