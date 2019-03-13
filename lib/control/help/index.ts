import { View, Component } from '@quenk/wml';
import { concat } from '../../util';
import { Message, setMessage, removeMessage } from '../feedback';
import { WidgetAttrs, getClassName } from '../../';
import { Main } from './wml/help';

///classNames:begin
export const HELP = 'ww-help';
///classNames:end

/**
 * HelpAttrs
 */
export interface HelpAttrs {

    /**
     * id for the help.
     */
    id?: string,

    /**
     * className for the help.
     */
    className?: string,

    /**
     * text for the help.
     */
    text?: string

}

/**
 * Help
 */
export class Help extends Component<WidgetAttrs<HelpAttrs>> {

    view: View = new Main(this);

    values = {

        help: {

          wml: {

            id: 'help'

          },
            id: (this.attrs.ww && this.attrs.ww.id) ?
                this.attrs.ww.id : '',

            className: concat(HELP, getClassName(this.attrs)),

            text: (this.attrs.ww && this.attrs.ww.text) ?
                [document.createTextNode(this.attrs.ww.text)] : this.children

        }

    }

    setMessage(msg: Message): Help {

        setMessage(this.view, this.values.help.wml.id, msg);
        return this;

    }

    removeMessage(): Help {

        removeMessage(this.view, this.values.help.wml.id);
        return this;

    }

}
