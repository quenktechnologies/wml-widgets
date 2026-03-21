import { Component } from '@quenk/wml';

import { Maybe } from '@quenk/noni/lib/data/maybe';

import { TOOLBAR_COMPAT } from '../toolbar';
import { DISABLED } from '../../content/state/disabled';
import { concat, getById } from '../../util';
import { getClassName, getId, HTMLElementAttrs } from '../../';
import { Message, getValidityClassName, getMessage } from '../feedback';
import { Help } from '../help';
import { TextFacadeView } from './views';

///classNames:begin
export const TEXT_FACADE = 'ww-text-facade';
export const TEXT_FACADE_CONTENT = 'ww-text-facade-content';
export const TEXT_FACADE_WRAPPER = 'ww-text-facade-wrapper';
///classNames:end

/**
 * TextFacadeAttrs
 */
export interface TextFacadeAttrs extends HTMLElementAttrs {
    /**
     * disabled
     */
    disabled?: boolean;

    /**
     * label to display above the control.
     */
    label?: string;

    /**
     * message to display to the user.
     */
    message?: Message;

    /**
     * error message to display.
     */
    error?: Message;

    /**
     * warning message to display.
     */
    warning?: Message;

    /**
     * success message to display.
     */
    success?: Message;

    /**
     * onClick handler.
     */
    onClick?: () => void;
}

/**
 * TextFacade is used to display a value in a text input like box.
 */
export class TextFacade extends Component<TextFacadeAttrs> {
    view = new TextFacadeView(this);

    id = getId(this.attrs);

    disabled = this.attrs.disabled;

    className = concat(
        TEXT_FACADE,

        getClassName(this.attrs),

        TOOLBAR_COMPAT,

        getValidityClassName(this.attrs),

        this.attrs.disabled ? DISABLED : ''
    );

    onclick = (e: Event) => {
        if (this.attrs.onClick) {
            e.preventDefault();

            if (!this.disabled) this.attrs.onClick();
        }
    };

    content = {
        className: TEXT_FACADE_CONTENT
    };

    label = this.attrs.label;

    messages = {
        wml: {
            id: 'messages'
        },
        text: getMessage(this.attrs)
    };

    wrapper = {
        className: TEXT_FACADE_WRAPPER
    };

    setMessage(msg: Message): TextFacade {
        getHelp(this).map(h => h.setMessage(msg));
        return this;
    }

    removeMessage(): TextFacade {
        getHelp(this).map(h => h.removeMessage());
        return this;
    }
}

const getHelp = (t: TextFacade): Maybe<Help> =>
    getById(t.view, t.messages.wml.id);
