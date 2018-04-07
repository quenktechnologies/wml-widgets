import * as wml from '@quenk/wml';
import * as views from './wml/link';
import { concat } from '../../../util';
import { ACTIVE } from '../../state/active';
import { WidgetAttrs, StylableAttrs } from '../../../';

///classNames:begin
/**
 * LINK
 */
export const LINK = 'ww-link';
///classNames:end

/**
 * LinkAttrs
 */
export interface LinkAttrs extends StylableAttrs {

    /**
     * name of this Link.
     */
    name?: string,

    /**
     * title of the Link.
     */
    title?: string,

    /**
     * href for the link element.
     */
    href?: string,

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
    onClick?: (e: LinkClickedEvent) => void

}

/**
 * LinkClickedEvent indicates an Link has been clicked.
 */
export class LinkClickedEvent {

    constructor(public name: string, public href: string) { }

}

/**
 * Link generates an <a> element.
 */
export class Link extends wml.Component<WidgetAttrs<LinkAttrs>> {

    view: wml.View = new views.Main(this);

    /**
     * name assigned to this Link.
     */
    name = (this.attrs.ww && this.attrs.ww.name) ?
        this.attrs.ww.name : '';

    /**
     * title assigned to this Link.
     */
    title = (this.attrs.ww && this.attrs.ww.title) ?
        this.attrs.ww.title : '';

    /**
     * href assigned to this Link
     */
    href = (this.attrs.ww && this.attrs.ww.href) ?
        this.attrs.ww.href : '';

    values = {

        a: {

            id: 'root',

            disabled: this.attrs.ww.disabled || null,

            class: concat(LINK,
                this.attrs.ww ? this.attrs.ww.class : '',
                (this.attrs.ww && this.attrs.ww.active) ?
                    ACTIVE : ''),

            title: (this.attrs.ww && this.attrs.ww.title) ?
                this.attrs.ww.title : null,

            name: (this.attrs.ww && this.attrs.ww.name) ?
                this.attrs.ww.name : null,

            href: (this.attrs.ww && this.attrs.ww.href) ?
                this.attrs.ww.href : '#',

            active: (this.attrs.ww && this.attrs.ww.active) ?
                this.attrs.ww.active : false,

            content: () => (this.attrs.ww && this.attrs.ww.text) ?
                this.attrs.ww.text : this.children,

            clicked: (e: Event): void => {

                if (this.attrs.ww) {

                    let { name, href, onClick } = this.attrs.ww;

                    if (!href)
                        e.preventDefault();

                    if (onClick)
                        onClick(new LinkClickedEvent(name, href));

                }

            }

        }

    };

    /**
      * activate this nav list Item.
      */
    activate(): Link {

        this.view.findById(this.values.a.id)
            .map((w: Element) => {
                w.classList.remove(ACTIVE);
                w.classList.add(ACTIVE);
            });

        return this;

    }

    /**
     * deactivate this nav list item.
     */
    deactivate(): Link {

        this.view.findById(this.values.a.id)
            .map((w: Element) => w.classList.remove(ACTIVE));

        return this;


    }

}
