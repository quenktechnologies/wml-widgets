import { Attrs, Component } from '@quenk/wml';
export interface Values {
    id: {
        /**
         * target to add or remove modifier classes to.
         */
        target: string;
    };
}
/**
 * Collapsable is an abstract api for creating widgets that show or hide
 * content when the user interacts with them.
 */
export declare abstract class Collapsable<A extends Attrs> extends Component<A> {
    values: Values;
    /**
     * open this Widget.
     */
    open(): void;
    /**
     * close this Widget.
     */
    close(): void;
    /**
     * toggle between open and close.
     */
    toggle(): void;
}
