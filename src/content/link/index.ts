import * as wml from '@quenk/wml';
import * as document from '@quenk/wml/lib/dom';
import * as views from './views';

import { Maybe } from '@quenk/noni/lib/data/maybe';

import { getById, concat } from '../../util';
import { ACTIVE } from '../state/active';
import { DISABLED } from '../state/disabled';
import { HTMLElementAttrs } from '../../';
import { Name } from '../../control';

///classNames:begin
export const LINK = 'ww-link';
///classNames:end

/**
 * LinkTitle shown on hover events.
 */
export type LinkTitle = string;

/**
 * Path used for href values usually corresponding to a location on page or on
 * a remote server.
 */
export type Path = string;

/**
 * LinkClickedEventHandler is a function that is executed when a link is clicked.
 */
export type LinkClickedEventHandler = (e: LinkClickedEvent) => void

/**
 * LinkAttrs
 */
export interface LinkAttrs extends HTMLElementAttrs {

    /**
     * name of this Link.
     */
    name?: Name,

    /**
     * title of the Link.
     */
    title?: LinkTitle,

    /**
     * href for the link element.
     */
    href?: Path,

    /**
     * target for the link.
     */
    target?: string,

    /**
     * disabled disables the link
     */
    disabled?: boolean,

    /**
     * text to display in the Link.
     */
    text?: string,

    /**
     * active indicates whether the Link is active or not.
     */
    active?: boolean,

    /**
     * onClick handler
     */
    onClick?: LinkClickedEventHandler

}

/**
 * LinkClickedEvent indicates an Link has been clicked.
 */
export class LinkClickedEvent {

    constructor(public name: Name, public href: Path) { }

}

/**
 * Link generates an <a> element.
 */
export class Link extends wml.Component<LinkAttrs> {

    view: wml.View = (this.attrs && this.attrs.disabled) ?
        new views.DisabledLinkView(this) :
        new views.LinkView(this);

    /**
     * name assigned to this Link.
     */
    name = (this.attrs && this.attrs.name) ?
        this.attrs.name : '';

    /**
     * title assigned to this Link.
     */
    title = (this.attrs && this.attrs.title) ?
        this.attrs.title : '';

    /**
     * href assigned to this Link
     */
    href = (this.attrs && this.attrs.href) ?
        this.attrs.href : '';

    values = {

        id: (this.attrs && this.attrs.id) ?
            this.attrs.id : '',

        disabled: (this.attrs && this.attrs.disabled) ?
            this.attrs.disabled : null,

        className: concat(LINK,
            (this.attrs && this.attrs.className) ?
                this.attrs.className : '',
            (this.attrs && this.attrs.active) ?
                ACTIVE : '',
            (this.attrs && this.attrs.disabled) ?
                DISABLED : '',
            (this.attrs && this.attrs.disabled) ?
                `-ww-disabled` : ''

        ),

        title: (this.attrs && this.attrs.title) ?
            this.attrs.title : null,

        name: (this.attrs && this.attrs.name) ?
            this.attrs.name : null,

        href: (this.attrs && this.attrs.href) ?
            this.attrs.href : '#',

        target: this.attrs.target,

        active: (this.attrs && this.attrs.active) ?
            this.attrs.active : false,

        //TODO: move to dom lib
        content: (this.attrs && this.attrs.text) ?
            [document.createTextNode(this.attrs.text)] :
            this.children,

        clicked: (e: Event): void => {

            if (this.attrs && !this.attrs.disabled) {

                let { name, href, onClick } = this.attrs;

                if (onClick) {
                    e.preventDefault();
                    onClick(new LinkClickedEvent(<string>name, <string>href));
                }

            }

        }

    };

    /**
      * activate this nav list Item.
      */
    activate(): Link {

        let m: Maybe<Element> = getById(this.view, this.values.id);

        if (m.isJust()) {

            let e = m.get();

            e.classList.remove(ACTIVE);
            e.classList.add(ACTIVE);

        }

        return this;

    }

    /**
     * deactivate this nav list item.
     */
    deactivate(): Link {

        let m: Maybe<Element> = getById(this.view, this.values.id);

        if (m.isJust())
            m.get().classList.remove(ACTIVE);

        return this;

    }

}
