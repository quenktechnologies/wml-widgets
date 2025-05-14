import { Component, View } from '@quenk/wml';

import { isString, isFunction } from '@quenk/noni/lib/data/type';
import { Record, mapTo, merge } from '@quenk/noni/lib/data/record';

import { getClassName, getId, HTMLElementAttrs } from '../..';
import { concat } from '../../util';
import { NavBarView } from './views/nav-bar';

///classNames:begin
export const NAV_BAR = 'ww-nav-bar';
///classNames:end

/**
 * Name is used to distinguish the links.
 */
export type Name = string;

/**
 * Path refers to the value of the href property of a link.
 */
export type Path = string;

/**
 * LinkHandler is a function that is executed when a link is clicked.
 */
export type LinkHandler = (name: Name) => void;

/**
 * LinkSpec specifies the configuration for the link.
 */
export type LinkSpec = Path | Partial<LinkConf> | LinkHandler;

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
export interface LinkSpecMap extends Record<LinkSpec> {}

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
export class NavBar extends Component<NavBarAttrs> {
    view: View = new NavBarView(this);

    values = {
        wml: {
            id: 'root'
        },

        id: getId(this.attrs),

        className: concat(NAV_BAR, getClassName(this.attrs)),

        links: this.attrs.links ? normalize(this.attrs.links) : []
    };
}

/**
 * normalize a LinkSpecMap into a list of LinkConf so they can be type safely
 * iterated.
 */
export const normalize = (specs: LinkSpecMap | LinkConf[]): LinkConf[] => {
    if (Array.isArray(specs)) return specs;
    else
        return mapTo(specs, (conf, title) => {
            if (isString(conf)) return { name: title, title, href: conf };
            else if (isFunction(conf))
                return { name: title, title, onClick: conf };
            else return merge({ title, name: title }, conf);
        });
};
