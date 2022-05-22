import * as wml from '@quenk/wml';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
/**
 * LINK
 */
export declare const LINK = "ww-link";
/**
 * LinkAttrs
 */
export interface LinkAttrs extends HTMLElementAttrs {
    /**
     * name of this Link.
     */
    name?: string;
    /**
     * title of the Link.
     */
    title?: string;
    /**
     * href for the link element.
     */
    href?: string;
    /**
     * disabled disables the link
     */
    disabled?: boolean;
    /**
     * text to display in the Link.
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
}
/**
 * LinkClickedEvent indicates an Link has been clicked.
 */
export declare class LinkClickedEvent {
    name: string;
    href: string;
    constructor(name: string, href: string);
}
/**
 * Link generates an <a> element.
 */
export declare class Link extends wml.Component<WidgetAttrs<LinkAttrs>> {
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
     * href assigned to this Link
     */
    href: string;
    values: {
        id: string;
        disabled: true | null;
        className: string;
        title: string | null;
        name: string | null;
        href: string;
        active: boolean;
        content: wml.Content[];
        clicked: (e: Event) => void;
    };
    /**
      * activate this nav list Item.
      */
    activate(): Link;
    /**
     * deactivate this nav list item.
     */
    deactivate(): Link;
}
