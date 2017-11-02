import * as wml from '@quenk/wml';
import { LinkClickedEvent } from './LinkClickedEvent';
export interface LinkAttrs extends wml.Attrs {
    ww?: {
        /**
         * class or classes to append to the link.
         */
        class?: string;
        /**
         * name of this link.
         */
        name?: string;
        /**
         * title of the link.
         */
        title?: string;
        /**
         * href for the anchor element.
         */
        href?: string;
        /**
         * text to display in the link.
         */
        text?: string;
        /**
         * active indicates whether the Link is active or not.
         */
        active?: boolean;
        /**
         * onClick handler
         */
        onClick?: (e: LinkClickedEvent) => void;
    };
}
/**
 * Link generates an <a> element.
 */
export declare class Link extends wml.Component<LinkAttrs> {
    view: wml.View;
    /**
     * name assigned to this Link.
     */
    name: string;
    /**
     * title assigned to this Link.
     */
    title: string;
    /**
     * href assigned to this link
     */
    href: string;
    values: {
        id: {
            root: string;
        };
        class: {
            root: string;
        };
        a: {
            title: string;
            name: string;
            href: string;
            active: boolean;
        };
    };
    clicked: (e: Event) => void;
    /**
      * activate this nav list Item.
      */
    activate(): void;
    /**
     * inactivate this nav list item.
     */
    inactivate(): void;
}
