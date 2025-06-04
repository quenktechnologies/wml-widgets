import { View, Component } from '@quenk/wml';

import {
    ERROR,
    getStyleClassName,
    INFO,
    Style,
    SUCCESS,
    WARNING
} from '../../content/style';
import { getClassName, getId, HTMLElementAttrs } from '../../';
import { MessageView } from './views/message';

/**
 * MessageAttrs
 */
export interface MessageAttrs extends HTMLElementAttrs {
    /**
     * text to display (without validation styles).
     */
    text?: string;

    /**
     * error text to display
     */
    error?: string;

    /**
     * warning text to display
     */
    warning?: string;

    /**
     * info text to display
     */
    info?: string;

    /**
     * success message to display
     */
    success?: string;
}

/**
 * Message displays a <p> of text in an optional validation state.
 */
export class Message extends Component<MessageAttrs> {
    view: View = new MessageView(this);

    id = getId(this.attrs);

    style = getStyleClass(this.attrs);

    className = getClassName(this.attrs, 'ww-message', this.style);

    text = getText(this.attrs);

    /**
     * setText to be displayed with optional style.
     */
    setText(text: string, style: Style) {
        this.text = text;
        this.style = getStyleClassName(style);
        this.view.invalidate();
    }

    /**
     * clear the message and validation styling.
     */
    clear() {
        this.text = '';
        this.style = '';
        this.view.invalidate();
    }
}

const getStyleClass = (attrs: MessageAttrs) => {
    if (attrs.error) return ERROR;
    if (attrs.warning) return WARNING;
    if (attrs.info) return INFO;
    if (attrs.success) return SUCCESS;
    return '';
};

const getText = (attrs: MessageAttrs) =>
    attrs.error ?? attrs.warning ?? attrs.info ?? attrs.success ?? attrs.text;
