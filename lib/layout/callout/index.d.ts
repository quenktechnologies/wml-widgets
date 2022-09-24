import { View, Component } from '@quenk/wml';
import { Style } from '../../content/style';
import { HTMLElementAttrs } from '../../';
export { Style };
export declare const CALLOUT = "ww-callout";
/**
 * CalloutAttrs
 */
export interface CalloutAttrs extends HTMLElementAttrs {
    /**
     * style
     */
    style: Style;
}
/**
 * Callout
 */
export declare class Callout extends Component<CalloutAttrs> {
    view: View;
    values: {
        id: string;
        className: string;
    };
}
