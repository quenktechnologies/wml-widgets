import { Component, View } from '@quenk/wml';
import { Record } from '@quenk/noni/lib/data/record';
import { HTMLElementAttrs } from '../..';
export declare const NAV_BAR = "ww-nav-bar";
/**
 * Name is used to distinguish the links.
 */
export declare type Name = string;
/**
 * Path refers to the value of the href property of a link.
 */
export declare type Path = string;
/**
 * LinkHandler is a function that is executed when a link is clicked.
 */
export declare type LinkHandler = (name: Name) => void;
/**
 * LinkSpec specifies the configuration for the link.
 */
export declare type LinkSpec = Path | Partial<LinkConf> | LinkHandler;
/**
 * LinkConf is used in the view to generate the links.
 */
export interface LinkConf {
    /**
     * name used to distinguish the link from others.
     */
    name: Name;
    /**
     * title displayed to the user.
     */
    title: string;
    /**
     * className to apply to the link.
     */
    className?: string;
    /**
     * href for the link.
     */
    href?: Path;
    /**
     * onClick handler.
     */
    onClick?: LinkHandler;
}
/**
 * LinkSpecMap is a map containing LinkSpecs
 */
export interface LinkSpecMap extends Record<LinkSpec> {
}
/**
 * NavBarAttrs
 */
export interface NavBarAttrs extends HTMLElementAttrs {
    /**
     * links to display in the NavBar.
     */
    links?: LinkSpecMap | LinkConf[];
}
/**
 * NavBar provides a vertical bar across the viewport that can be used for
 * displaying navigational links.
 */
export declare class NavBar extends Component<NavBarAttrs> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
        links: LinkConf[];
    };
}
