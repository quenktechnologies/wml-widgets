import * as wml from '@quenk/wml';
import * as link from '@package/wml-widgets/nav/link';
import * as names from '@package/wml-widgets/common/names';
import * as views from './wml/link';
import { concat } from '@package/wml-widgets/common/util';
import { LinkClickedEvent } from '@package/wml-widgets/nav/link';

/**
 * Link provides a link entry into a nav menu.
 */
export class Link extends link.Link {

    view: wml.View = new views.Main(this);

    values = {

        id: { root: '' },
        class: { root: '' },
        item: {

            class: concat(names.NAV_MENU_ITEM,
                (this.attrs.ww && this.attrs.ww.active) ? names.ACTIVE : '')

        },
        a: {

            class: concat((this.attrs.ww && this.attrs.ww.active) ?
                names.ACTIVE : ''),

            title: (this.attrs.ww && this.attrs.ww.title) ?
                this.attrs.ww.title : '',

            name: (this.attrs.ww && this.attrs.ww.name) ?
                this.attrs.ww.name : '',

            href: (this.attrs.ww && this.attrs.ww.href) ?
                this.attrs.ww.href : '#',

            active: (this.attrs.ww && this.attrs.ww.active) ?
                this.attrs.ww.active : false,

            text: (this.attrs.ww && this.attrs.ww.text) ?
                this.attrs.ww.text : '',

            onClick: (this.attrs.ww && (<(e: LinkClickedEvent) => void>this.attrs.ww.onClick)) ?
                this.attrs.ww.onClick : null

        }

    };

}

