import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { WidgetAttrs, getId, getClassName, HTMLElementAttrs } from '../../';
import { close } from '../prompt';
import { Main } from './wml/inform';

///classNames:begin
export const INFORM = 'ww-inform';
export const INFORM_OK = 'ww-inform__ok';
///classNames:end

/**
 * InformAttrs
 */
export interface InformAttrs extends HTMLElementAttrs {

    /**
     * title of the confirm.
     */
    title?: string,

    /**
     * buttonText 
     */
    buttonText?: string,

    /**
     * onClose handler.
     */
    onClose: () => void,

}

/**
 * Inform displays a message to the user.
 */
export class Inform extends Component<WidgetAttrs<InformAttrs>> {

    view: View = new Main(this);

    values = {

        id: getId(this.attrs),

        className: concat(INFORM, getClassName(this.attrs)),

        wml: {

            id: 'modal'

        },

        header: {

            title: (this.attrs.ww && this.attrs.ww.title) ?
                this.attrs.ww.title : ''

        },
        footer: {

            ok: {

                text: (this.attrs.ww && this.attrs.ww.buttonText) ?
                    this.attrs.ww.buttonText : 'Ok',

                wml: {

                    id: 'ok'

                },

                className: concat(INFORM_OK, '-primary'),

                onClick: () => {

                    if (this.attrs.ww && this.attrs.ww.onClose)
                        this.attrs.ww.onClose();

                    this.close();

                }

            }

        }

    }

    close(): Inform {

        close(this.view, this.values.wml.id);
        return this;

    }

}
