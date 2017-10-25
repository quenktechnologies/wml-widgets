import * as wml from '@quenk/wml';
import * as names from '@package/self/common/names';
import * as views from './wml/link';
import { LinkClickedEvent } from './LinkClickedEvent';
import { concat } from '@package/self/common/util';

export interface LinkAttrs extends wml.Attrs {

    ww?: {

        /**
         * class or classes to append to the link.
         */
        class?: string

        /**
         * name of this link.
         */
        name?: string

        /**
         * title of the link.
         */
        title?: string

        /**
         * href for the anchor element.
         */
        href?: string

        /**
         * text to display in the link.
         */
        text?: string

        /**
         * active indicates whether the Link is active or not.
         */
        active?: boolean

        /**
         * onClick handler
         */
        onClick?: (e: LinkClickedEvent) => void

    }

}

/**
 * Link generates an <a> element.
 */
export class Link extends wml.Component<LinkAttrs> {

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
     * href assigned to this link
     */
    href = (this.attrs.ww && this.attrs.ww.href) ?
        this.attrs.ww.href : '';

    values = {

        id: {

            root: 'root'

        },
        class: {

            root: concat(names.NAV_LINK,
                this.attrs.ww ? this.attrs.ww.class : '',
                (this.attrs.ww && this.attrs.ww.active) ?
                    names.ACTIVE : '')

        },
        a: {

            title: (this.attrs.ww && this.attrs.ww.title) ?
                this.attrs.ww.title : null,

            name: (this.attrs.ww && this.attrs.ww.name) ?
                this.attrs.ww.name : null,

            href: (this.attrs.ww && this.attrs.ww.href) ?
                this.attrs.ww.href : '#',

            active: (this.attrs.ww && this.attrs.ww.active) ?
                this.attrs.ww.active : false

        }

    };

    clicked = (e: Event): void => {

        if (this.attrs.ww) {

            let { name, href, onClick } = this.attrs.ww;

            if (!href)
                e.preventDefault();

            if (onClick)
                onClick(new LinkClickedEvent(name, href));

        }

    }

    /**
      * activate this nav list Item.
      */
    activate(): void {

        this.view.findById(this.values.id.root)
            .map((w: Element) => {
                w.classList.remove(names.ACTIVE);
                w.classList.add(names.ACTIVE);
            });

    }

    /**
     * inactivate this nav list item.
     */
    inactivate(): void {

        this.view.findById(this.values.id.root)
            .map((w: Element) => w.classList.remove(names.ACTIVE));


    }

}
