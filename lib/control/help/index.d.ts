import { View, Component } from '@quenk/wml';
import { Message } from '../feedback';
import { HTMLElementAttrs } from '../../';
export declare const HELP = "ww-help";
/**
 * HelpAttrs
 */
export interface HelpAttrs extends HTMLElementAttrs {
    /**
     * id for the help.
     */
    id?: string;
    /**
     * className for the help.
     */
    className?: string;
    /**
     * text for the help.
     */
    text?: string;
}
/**
 * Help
 */
export declare class Help extends Component<HelpAttrs> {
    view: View;
    values: {
        help: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
            text: import("@quenk/wml").Content[];
        };
    };
    setMessage(msg: Message): Help;
    removeMessage(): Help;
}
