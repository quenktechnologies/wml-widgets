import { View, Component } from '@quenk/wml';
import { concat, getById } from '../../util';
import { WidgetAttrs, getId, getClassName, HTMLElementAttrs } from '../../';
import { Main } from './wml/prompt';
import { Modal } from '../modal';
import { Button } from '../../control/button';

///classNames:begin
export const PROMPT = 'ww-prompt';
export const PROMPT_CLOSE = 'ww-prompt__close';
export const PROMPT_SAVE = 'ww-prompt__save';
///classNames:end

/**
 * PromptAttrs
 */
export interface PromptAttrs extends HTMLElementAttrs {

    /**
     * title of thee prompt.
     */
    title?: string,

    /**
     * closeText displayed in the close button.
     */
    closeText?: string,

    /**
     * saveText displayed in the save butotn.
     */
    saveText?: string,

    /**
     * disabled if true will disable the save button.
     */
    disabled?: boolean,

    /**
     * onSave handler.
     */
    onSave: () => void,

    /**
     * onCancel handler.
     */
    onCancel: () => void

}

/**
 * Prompt displays a dialog to the user suitable for collecting data
 * input.
 */
export class Prompt extends Component<WidgetAttrs<PromptAttrs>> {

    view: View = new Main(this);

    values = {

        id: getId(this.attrs),

        className: concat(PROMPT, getClassName(this.attrs)),

        wml: {

            id: 'modal'

        },

        header: {

            title: (this.attrs.ww && this.attrs.ww.title) ?
                this.attrs.ww.title : ''

        },
        footer: {

            close: {

                text: (this.attrs.ww && this.attrs.ww.closeText) ?
                    this.attrs.ww.closeText : 'Close',

                className: PROMPT_CLOSE,

                onClick: () => {

                    if (this.attrs.ww && this.attrs.ww.onCancel)
                        this.attrs.ww.onCancel();

                    this.close();

                }

            },

            save: {

                text: (this.attrs.ww && this.attrs.ww.saveText) ?
                    this.attrs.ww.saveText : 'Save',

                wml: {

                    id: 'save'

                },

                className: concat('-primary', PROMPT_SAVE),

                disabled: (this.attrs.ww && this.attrs.ww.disabled) ?
                    true : false,

                onClick: () => {

                    if (this.attrs.ww && this.attrs.ww.onSave)
                        this.attrs.ww.onSave();

                    this.close();

                }

            }

        }

    }

    close(): Prompt {

        close(this.view, this.values.wml.id);
        return this;

    }

    /**
     * enable saving.
     */
    enable(): Prompt {

        getSave(this).map(b => b.enable());
        return this;

    }

    /**
     * disable saving.
     */
    disable(): Prompt {

        getSave(this).map(b => b.disable());
        return this;

    }

}

const getSave = (p: Prompt) =>
    getById<Button<void>>(p.view, p.values.footer.save.wml.id);

/**
 * close the Modal in a view.
 */
export const close = (view: View, id: string) =>
    getById<Modal>(view, id).map(m => m.close());
