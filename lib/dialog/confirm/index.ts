import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { WidgetAttrs, getId, getClassName, HTMLElementAttrs } from '../../';
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
    title?: string,

    /**
     * primary
     */
    primary?: Primary,

    /**
     * noText 
     */
    noText?: string,

    /**
     * yesText 
     */
    yesText?: string,

    /**
     * onYes handler.
     */
    onYes: () => void,

    /**
     * onNo handler.
     */
    onNo: () => void

}

/**
 * Confirm displays a dialog for confirming an action.
 */
export class Confirm extends Component<WidgetAttrs<ConfirmAttrs>> {

    view: View = new Main(this);

    values = {

        id: getId(this.attrs),

        className: concat(CONFIRM, getClassName(this.attrs)),

        wml: {

            id: 'modal'

        },

        header: {

            title: (this.attrs.ww && this.attrs.ww.title) ?
                this.attrs.ww.title : ''

        },
        footer: {

            no: {

                text: (this.attrs.ww && this.attrs.ww.noText) ?
                    this.attrs.ww.noText : 'No',

                className: concat(CONFIRM_NO, (this.attrs.ww &&
                    this.attrs.ww.primary &&
                    this.attrs.ww.primary === Primary.No) ? '-primary' : ''),

                onClick: () => {

                    if (this.attrs.ww && this.attrs.ww.onNo)
                        this.attrs.ww.onNo();

                    this.close();

                }

            },

            yes: {

                text: (this.attrs.ww && this.attrs.ww.yesText) ?
                    this.attrs.ww.yesText : 'Yes',

                wml: {

                    id: 'yes'

                },

                className: concat(CONFIRM_YES, (this.attrs.ww &&
                    this.attrs.ww.primary &&
                    this.attrs.ww.primary === Primary.No) ? '' : '-primary'),

                onClick: () => {

                    if (this.attrs.ww && this.attrs.ww.onYes)
                        this.attrs.ww.onYes();

                    this.close();

                }

            }

        }

    }

    close(): Confirm {

        close(this.view, this.values.wml.id);
        return this;

    }

}
