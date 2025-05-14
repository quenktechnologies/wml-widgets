import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { getId, getClassName, HTMLElementAttrs } from '../../';
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
    title?: string;

    /**
     * buttonText
     */
    buttonText?: string;

    /**
     * onClose handler.
     */
    onClose: () => void;
}

/**
 * Inform displays a message to the user.
 */
export class Inform extends Component<InformAttrs> {
    view: View = new Main(this);

    values = {
        id: getId(this.attrs),

        className: concat(INFORM, getClassName(this.attrs)),

        wml: {
            id: 'modal'
        },

        header: {
            title: this.attrs && this.attrs.title ? this.attrs.title : ''
        },
        footer: {
            ok: {
                text:
                    this.attrs && this.attrs.buttonText
                        ? this.attrs.buttonText
                        : 'Ok',

                wml: {
                    id: 'ok'
                },

                className: concat(INFORM_OK, '-primary'),

                onClick: () => {
                    if (this.attrs && this.attrs.onClose) this.attrs.onClose();

                    this.close();
                }
            }
        }
    };

    close(): Inform {
        close(this.view, this.values.wml.id);
        return this;
    }
}
